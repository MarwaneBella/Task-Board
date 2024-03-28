import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/models/task';

export const addTaskToColumn = createAction('[ColumnTask] Add Task', props<{ columnId: number, task: Task }>());
export const removeTaskFromColumn = createAction('[ColumnTask] Remove Task', props<{ columnId: number, taskId: number }>());
export const updateTaskInColumn = createAction('[ColumnTask] Update Task', props<{ columnId: number, task: Task }>());
// Action to update task order within the same column
export const updateTaskOrderInColumn = createAction(
    '[Column Task] Update Task Order In Column',
    props<{ columnId: number; currentIndex: number; previousIndex: number }>()
  );
  
  export const moveTaskBetweenColumns = createAction(
    '[Column Task] Move Task Between Columns',
    props<{ previousColumnId: number; newColumnId: number; task: Task; currentIndex: number }>()
  );