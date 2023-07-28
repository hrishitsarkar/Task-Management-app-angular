import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './tasks.reducer';

@NgModule({
    imports : [
        StoreModule.forFeature('tasks',tasksReducer)
    ],
})

export class TasksStoreModule {}