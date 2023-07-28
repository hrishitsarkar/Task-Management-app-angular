import { ChangeDetectorRef, Component, EventEmitter, Input } from '@angular/core';
import { Task } from './task/tasks.model';
import {db} from '../firebaseInit';
import { Store } from '@ngrx/store';
import { collection, addDoc, setDoc, doc, onSnapshot } from "firebase/firestore"; 
import { AppState } from './app.state';
import { addTask, resetTasks } from './task/tasks.action';
import { selectAllTasks } from './task/tasks.selector';
import {  compareTasksByDate, compareTasksByPriority, compareTasksByStatus,  } from './task.util';
import { convertToCSV } from './csvTask.util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  todos : any = []; 
  constructor(private store: Store<AppState>,private cdr: ChangeDetectorRef) {}
  selectedTask: Task | null = null;
  isEditing: boolean = false;
  
  editTask(task: Task) {
    this.isEditing = true;
    this.selectedTask = task;
    console.log(this.selectedTask)
    alert('Please update in the form above')
    
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
alert("Sorted by due dates")
 }
 downloadCSV(data: string, filename: string) {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  window.URL.revokeObjectURL(url);
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
alert("Sorted by priorities")
 }
 exportCsv() {
  const unsub = onSnapshot(collection(db,'tasks'), (snapshot) => {
    const tasks : any[] = snapshot.docs.map((doc) => {
      
      return {
        ...doc.data()
      }
    })
    const csv = convertToCSV(tasks);
    this.downloadCSV(csv, 'tasks.csv');
  })
  ;
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
alert("Sorted by Status")
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
