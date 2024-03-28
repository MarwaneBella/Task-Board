import { createReducer, on } from '@ngrx/store';
import * as ColumnTaskActions from './column-task.actions';
import { ColumnTask } from 'src/app/models/colunm-task';

export interface ColumnTaskState {
  columnTasks: ColumnTask[];
  totalTaskCount : number
}

export const initialState: ColumnTaskState = {
  columnTasks: [
    { id: 1, title: 'To-do', tasks: [] },
    { id: 2, title: 'In Progress', tasks: [] },
    { id: 3, title: 'Review', tasks: [] },
    { id: 4, title: 'Completed', tasks: [] }
  ],
  totalTaskCount: 0,
};




export const columnTaskReducer = createReducer(
  initialState,
  on(ColumnTaskActions.addTaskToColumn, (state, { columnId, task }) => {
    const updatedColumnTasks = state.columnTasks.map(column => {
      if (column.id === columnId) {
        const newTask = { ...task, id: state.totalTaskCount + 1 };
        return {
          ...column,
          tasks: [...column.tasks, newTask]
        };
      }
      return column;
    });

    return {
      ...state,
      columnTasks: updatedColumnTasks,
      totalTaskCount: state.totalTaskCount + 1 // Increment totalTaskCount
    };
  }),

  on(ColumnTaskActions.removeTaskFromColumn, (state, { columnId, taskId }) => ({
    ...state,
    columnTasks: state.columnTasks.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      return column;
    })
  })),

  on(ColumnTaskActions.updateTaskInColumn, (state, { columnId, task }) => ({
    ...state,
    columnTasks: state.columnTasks.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.map(t => t.id === task.id ? task : t)
        };
      }
      return column;
    })
  })),

  on(ColumnTaskActions.updateTaskOrderInColumn, (state, { columnId, currentIndex, previousIndex }) => {
    const updatedColumnTasks = state.columnTasks.map(column => {
      if (column.id === columnId) {
        // Reorder the tasks within the column based on the new index
        const tasks = [...column.tasks];
        const movedTask = tasks.splice(previousIndex, 1)[0];
        tasks.splice(currentIndex, 0, movedTask);
        return { ...column, tasks };
      }
      return column;
    });

    return { ...state, columnTasks: updatedColumnTasks };
  }),


  on(ColumnTaskActions.moveTaskBetweenColumns, (state, { previousColumnId, newColumnId, task, currentIndex }) => {

    const updatedColumnTasks = state.columnTasks.map(column => {

      if (column.id === previousColumnId) {
        // Remove the task from the previous column
          const tasks = column.tasks.filter(t => t.id !== task.id);
          return { ...column, tasks };
      
        
      } else if (column.id === newColumnId) {
        // Insert the task into the new column at currentIndex
        const tasks = [...column.tasks.slice(0, currentIndex), task, ...column.tasks.slice(currentIndex)];        
        return { ...column, tasks };

      }
      return column;

    });
    

    return {
      ...state,
      columnTasks: updatedColumnTasks
    };
  })



);