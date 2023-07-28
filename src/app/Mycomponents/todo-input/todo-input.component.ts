import { ChangeDetectorRef, Component,Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Task } from 'src/app/Task';
import { AppState } from 'src/app/app.state';
import { addTask, deleteTask } from 'src/app/task/tasks.action';
import { db } from 'src/firebaseInit';
@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent {
  @Input() selectedTask: Task | null = null;
  @Input() isEditing!: boolean;
  task : Task = {
    title: '',
    desc: '',
    date: '',
    priority: '',
    status: '',
    createdOn: '',
    updatedOn: '',
    id: ''
  }
  constructor(private store: Store<AppState> ,private cdr: ChangeDetectorRef) {}
  
 ngOnInit(){
  console.log('Received isEditing value:', this.isEditing);
  
 }
 ngOnChanges(changes: SimpleChanges) {
  // Check if the 'isEditing' property has changed
  if (changes['isEditing']) {
    // Update the 'isEditing' value in the component
    this.isEditing = changes['isEditing'].currentValue;
    console.log('Received isEditing value in TodoInputComponent:', this.isEditing);
    // You can also perform additional logic or actions here if needed
  }
}
  
  async addaTask(){
   if(this.task.title && this.task.desc && this.task.date && this.task.priority){

    const newTask = {
      
      title : this.task.title,
      desc : this.task.desc,
      date : this.task.date,
      priority: this.task.priority,
      status : this.task.status,
      createdOn : new Date().toJSON().slice(0, 10),
      updatedOn : ''
    }
    const docRef =  doc(collection(db, "tasks"));
    
    const newTaskWithId = {...newTask,id:docRef.id}
    
    await setDoc(docRef,newTaskWithId);
    this.clearInputs();
    alert("Task added successfully")
    
   }
  }
  
  async updateaTask(task : Task | null){
    if(task !== null){
      const taskRef = doc(db, "tasks", task.id);
      const newTask = {
        title : this.task.title,
      desc : this.task.desc,
      date : this.task.date,
      priority: this.task.priority,
      status : this.task.status,
      
      updatedOn : new Date().toJSON().slice(0, 10),
      }
      await updateDoc(taskRef,newTask);
      this.clearInputs();
      this.isEditing=false
      alert("Updated Successfully")
;    }else{
      return;
    }
  }
  clearInputs(){
    this.task.title = '';
    this.task.desc = '';
    this.task.date = '';
    this.task.priority = '';
    this.task.status = '';
    
   
  }
  
  
}
