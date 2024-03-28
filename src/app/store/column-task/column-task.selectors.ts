import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ColumnTaskState } from './column-task.reducer';
import { ColumnTask } from 'src/app/models/colunm-task';

export const selectColumnTaskState = createFeatureSelector<ColumnTaskState>('columnTasks');

export const selectAllColumnTasks = createSelector(
  selectColumnTaskState,
  (state: ColumnTaskState) => state.columnTasks
);

export const selectTasksInColumn = (columnId: number) => createSelector(
  selectAllColumnTasks,
  (columnTasks: ColumnTask[]) => {
    const column = columnTasks.find(column => column.id === columnId);
    return column ? column.tasks : [];
  }
);

export const selectColumnsWithTasksByPriority = (priority: string) => createSelector(
  selectAllColumnTasks,
  (columns: ColumnTask[]) => {
    return columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.priority === priority)
    }));
  }
);

