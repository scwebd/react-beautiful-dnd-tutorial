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
        console.log(result);
        const { destination, source, draggableId } = result;
        var newState; // seems inefficient... but I want function scoping, so???

        if (!destination) {
            return false;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return false;
        }

        // TODO: There's *got* to be a better way to do this; too much duplicated code...
        // if user is moving between columns
        if (destination.droppableId !== source.droppableId) {
            const oldColumn = this.state.columns[source.droppableId];
            const newColumn = this.state.columns[destination.droppableId];

            const oldColumnTaskIds = Array.from(oldColumn.taskIds);
            const newColumnTaskIds = Array.from(newColumn.taskIds);
            oldColumnTaskIds.splice(source.index, 1);
            newColumnTaskIds.splice(destination.index, 0, draggableId);

            const oldColumnAltered = {
                ...oldColumn,
                taskIds: oldColumnTaskIds
            }

            const newColumnAltered = {
                ...newColumn,
                taskIds: newColumnTaskIds
            }

            newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [oldColumn.id]: oldColumnAltered,
                    [newColumn.id]: newColumnAltered
                }
            }
        // or if the user is instead just moving within the existing columns
        } else {
            const column = this.state.columns[source.droppableId];
            const newTaskIds = Array.from(column.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                taskIds: newTaskIds
            }

            newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
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
