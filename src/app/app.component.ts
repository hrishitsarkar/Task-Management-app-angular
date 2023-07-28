import { ChangeDetectorRef, Component, EventEmitter, Input } from '@angular/core';
import {db} from '../firebaseInit';
import { Store } from '@ngrx/store';
import { collection, addDoc, setDoc, doc, onSnapshot } from "firebase/firestore"; 
import { AppState } from './app.state';
import { addTask, resetTasks } from './task/tasks.action';
import { selectAllTasks } from './task/tasks.selector';
import {  compareTasksByDate, compareTasksByPriority, compareTasksByStatus,  } from './task.util';
import { convertToCSV } from './csvTask.util';
import { ngxCsv } from 'ngx-csv';
import { ToastrService } from 'ngx-toastr';
import { Task } from './Task';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  todos : any = []; 
  selectedTask?: Task;
  constructor(private store: Store<AppState>,private cdr: ChangeDetectorRef,private toastr: ToastrService) {}
  
 

  isEditing: boolean = false;
  updateTask(){
    console.log("inside update",this.selectedTask)
  }
  editTask(task: Task) {
    this.isEditing = true;
    this.selectedTask = new Task(task.id, task.title, task.desc, task.date,task.priority,task.status,task.createdOn,task.updatedOn);
    
    this.toastr.info('Please update in the form above')
    
  }
  ngOnInit(){
    this.getTasksFirebase();
    
   
  }
  
 sortByDate(){
  const unsub = onSnapshot(collection(db,'tasks'), (snapshot) => {
    const tasks : any[] = snapshot.docs.map((doc) => {
      
      return {
        ...doc.data()
      }
    })
    tasks.sort(compareTasksByDate)
    this.store.dispatch(resetTasks());
    tasks.forEach((task: Task) => {
      this.store.dispatch(addTask({ task }));
    });
});
this.toastr.success("Sorted by Due Dates")
 }
 
 sortByPriority(){
  const unsub = onSnapshot(collection(db,'tasks'), (snapshot) => {
    const tasks : any[] = snapshot.docs.map((doc) => {
      
      return {
        ...doc.data()
      }
    })
    tasks.sort(compareTasksByPriority)
    this.store.dispatch(resetTasks());
    tasks.forEach((task: Task) => {
      this.store.dispatch(addTask({ task }));
    });
});
this.toastr.success("Sorted by Priorities")
 }
 exportCsv() {
  
  this.store.select(selectAllTasks).subscribe((tasks) => {
    var options = {
      headers : ['title','desc','date','priority','status','createdOn','updatedOn','id']
    }
    new ngxCsv(tasks,"report",options)
  });
  this.toastr.success("Tasks Exported Successfully")
}


 sortByStatus(){
  const unsub = onSnapshot(collection(db,'tasks'), (snapshot) => {
    const tasks : any[] = snapshot.docs.map((doc) => {
      
      return {
        ...doc.data()
      }
    })
    tasks.sort(compareTasksByStatus)
    this.store.dispatch(resetTasks());
    tasks.forEach((task: Task) => {
      this.store.dispatch(addTask({ task }));
    });
});
this.toastr.success("Sorted by Status")
 }


  getTasksFirebase(){
    const unsub = onSnapshot(collection(db,'tasks'), (snapshot) => {
        const tasks : any[] = snapshot.docs.map((doc) => {
          
          return {
            ...doc.data()
          }
        })
        
        this.store.dispatch(resetTasks());
        tasks.forEach((task: Task) => {
          this.store.dispatch(addTask({ task }));
        });
  });
  
  }
}
