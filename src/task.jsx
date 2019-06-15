import React, { Component } from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'

const Container = styled.div`
    display: flex; 
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => 
        props.isDragDisabled 
        ? 'lightgrey' 
        :
        props.isDragging 
            ? 'lightgreen' 
            : 'white'};
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    
   
`;
export default class task extends Component {
    render() {
        const isDragDisabled = this.props.task.id === 'task-1'
        return (
        <Draggable draggableId={this.props.task.id} index={this.props.index} isDragDisabled={isDragDisabled}>
            {(provided,snapshot) => ( 
                <Container
                    {...provided.draggableProps}
                    // {...provided.dragHandleProps}
                    // innerRef={provided.innerRef}
                    ref={provided.innerRef} 
                    isDragging={snapshot.isDragging}
                    >
                    <Handle {...provided.dragHandleProps}/> 
                    {this.props.task.content}
                </Container>
            )}
        </Draggable> 
        )
    }
}
