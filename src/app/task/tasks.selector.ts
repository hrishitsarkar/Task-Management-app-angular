import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TasksState } from './tasks.reducer';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectAllTasks = createSelector(selectTasksState, (state) => state.tasks);