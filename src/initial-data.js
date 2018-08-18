const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Create Header Megamenu'},
        'task-2': { id: 'task-2', content: 'Set up routes'},
        'task-3': { id: 'task-3', content: 'Wire up Redux data store'},
        'task-4': { id: 'task-4', content: 'Seed initial data'},
        'task-5': { id: 'task-5', content: 'JavaScript for draggable list items'},
        'task-6': { id: 'task-6', content: 'Build data models'}
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'In QA',
            taskIds: ['task-6', 'task-5']
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: ['task-2']
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData;