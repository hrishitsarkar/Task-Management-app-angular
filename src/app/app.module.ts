import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoInputComponent } from './Mycomponents/todo-input/todo-input.component';
import { TodoCardsComponent } from './Mycomponents/todo-cards/todo-cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksStoreModule } from './task/tasks.store.module';
import { StoreModule } from '@ngrx/store';
import {tasksReducer} from './task/tasks.reducer'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoCardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TasksStoreModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    StoreModule.forRoot({ tasks: tasksReducer }),
    
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
