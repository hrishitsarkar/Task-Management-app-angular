import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../Task';
import { addTask,updateTask,deleteTask } from './tasks.action';
 
@Injectable({
    providedIn : 'root'
})

export class TaskService {
     constructor(private store : Store){}

     addTask(task : Task){
        this.store.dispatch(addTask({task}));
     }
     updateTask(task : Task){
        this.store.dispatch(updateTask({task}))
     }
     deleteTask(id : string){
        this.store.dispatch(deleteTask({id}));
     }
}