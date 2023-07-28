import { Component ,EventEmitter,Input, Output} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { deleteDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Task } from 'src/app/Task';
import { AppState } from 'src/app/app.state';
import { selectAllTasks } from 'src/app/task/tasks.selector';
import { db } from 'src/firebaseInit';

@Component({
  selector: 'app-todo-cards',
  templateUrl: './todo-cards.component.html',
  styleUrls: ['./todo-cards.component.css']
})
export class TodoCardsComponent {
  alltasks$ = this.store.select(selectAllTasks)
  
  @Input() isEditing: boolean = false;
  @Input() editTask: (task: any) => void = (task: any) => {};
  @Input() exportCsv: () => void = () => {};
  @Input() sortByDate: () => void = () => {};
  @Input() sortByPriority: () => void = () => {};
  @Input() sortByStatus: () => void = () => {};

  @Output() editButtonClick: EventEmitter<Task> = new EventEmitter<Task>();
  constructor(private store: Store) {}
    ngOnInit(){
      
    }
    async deleteaTask(task : Task | null){
      if(task !== null){
        await deleteDoc(doc(db, "tasks", task.id));
      }
      alert("Task deleted successfully")
    }
    onEditButtonClick(task: Task) {
      this.editButtonClick.emit(task);
    }
    
}
