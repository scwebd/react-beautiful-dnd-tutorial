import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

// TODO: make width dynamic based on number of columns!!!
const Container = styled.div`
    border: 1px solid lightgray;
    border-radius: 2px;
    box-sizing: border-box;
    margin: 8px;
    width: 30%;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.ul`
    list-style-type: none;
    padding: 8px;
`;

export default class Column extends Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {provided => (
                        <TaskList
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.tasks.map((task, index) => <Task key={task.id} index={index} task={task} />)}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        )
    }
}
