import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial-data'
import Column from './column'
import '@atlaskit/css-reset'
import {DragDropContext} from 'react-beautiful-dnd'
import styled from 'styled-components'

// const App =() => 'hello world'

const Container = styled.div`
    display: flex;
`;

class App extends React.Component{
    state = initialData

    onDragEnd = result => {
        console.log(result)
        // document.body.style.color = 'inherit'
        // document.body.style.backgroundColor = 'inherit'
        const {destination, source, draggableId} = result;

        if(!destination){
            return;
        }

        if(destination.droppablId === source.droppablId &&
            destination.index === source.index){
                return;
            }
        // const column = this.state.columns[source.droppableId]

        const start = this.state.columns[source.droppableId]
        const finish = this.state.columns[destination.droppableId]

        if(start === finish){
            
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start, 
                taskIds: newTaskIds,
            }

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                }
            }

            this.setState(newState);
            return;
        }

        //Moving from one to another list

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);

        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState= {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        }

        this.setState(newState);
        
    }

    // onDragStart = () => {
    //     document.body.style.color = 'orange';
    //     document.body.style.transition = 'background-color 0.2s ease'
    // }

    // onDragUpdate = update => {
    //     const {destination} = update
    //     const opacity = destination ? destination.index / Object.keys(this.state.tasks).length
    //     : 0;
    //     document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`
    // }
    render(){
        return ( 
        <DragDropContext
            // onDragStart = {this.onDragStart}
            // onDragUpdate = {this.onDragUpdate}
            onDragEnd = {this.onDragEnd}
        >
            <Container>
                {this.state.columnOrder.map(columnId => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

                    // return column.title;
                    return <Column key={column.id} column={column} tasks={tasks}/>
                })}
            </Container>
        </DragDropContext>
        )}
    }

ReactDOM.render(<App />, document.getElementById('root'));

