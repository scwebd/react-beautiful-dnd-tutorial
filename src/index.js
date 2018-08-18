import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import registerServiceWorker from './registerServiceWorker';
import initialData from './initial-data';
import '@atlaskit/css-reset';
import Column from './components/Column';

const Container = styled.div`
    align-content: space-around;
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

class App extends Component {
    state = initialData;

    onDragEnd = result => {
        // ?????
        const { destination, source, draggableId } = result;

        if (!destination) {
            return false;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return false;
        }

        const column = this.state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn
            }
        }

        this.setState(newState);
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Container>
                    {this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                        return <Column key={column.id} column={column} tasks={tasks} />;
                    })}
                </Container>
            </DragDropContext>
        )

    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
