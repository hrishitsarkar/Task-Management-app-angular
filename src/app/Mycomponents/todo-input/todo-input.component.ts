import { ChangeDetectorRef, Component,Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Task } from 'src/app/Task';
import { AppState } from 'src/app/app.state';
import { addTask, deleteTask } from 'src/app/task/tasks.action';
import { db } from 'src/firebaseInit';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private store: Store<AppState> ,private cdr: ChangeDetectorRef,private toastr: ToastrService) {}
  
 ngOnInit(){
  
  
 }
 ngOnChanges(changes: SimpleChanges) {
  // Check if the 'isEditing' property has changed
  if (changes['isEditing']) {
    // Update the 'isEditing' value in the component
    this.isEditing = changes['isEditing'].currentValue;
    
    
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
      updatedOn : 'N/A'
    }
    const docRef =  doc(collection(db, "tasks"));
    
    const newTaskWithId = {...newTask,id:docRef.id}
    
    await setDoc(docRef,newTaskWithId);
    this.clearInputs();
    this.toastr.success('Task Created Successfully');
    
   }else{
    this.toastr.error('Please fill all the fields');
   }
  }
  
   async updateaTask(task : Task | null ){
    if (task !== null && this.selectedTask !== null) {
      

     
      const updatedTask = {...this.selectedTask}
      const taskRef = doc(db, "tasks", this.selectedTask.id);

      await updateDoc(taskRef,{...updatedTask,updatedOn : new Date().toJSON().slice(0, 10)});
      this.isEditing = false
      this.toastr.success("Task Updated Successfully");

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
