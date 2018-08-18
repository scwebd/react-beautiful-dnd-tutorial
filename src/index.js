import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import registerServiceWorker from './registerServiceWorker';
import initialData from './initial-data';
import '@atlaskit/css-reset';
import Column from './components/Column';

class App extends Component {
    state = initialData;

    onDragEnd = result => {
        // ?????
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.columnOrder.map(columnId => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </DragDropContext>
        )

    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
