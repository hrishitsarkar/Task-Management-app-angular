import { createReducer, on } from "@ngrx/store";
import { Task } from "../Task";
import { addTask, deleteTask, updateTask ,loadTasks, loadTasksSuccess, resetTasks} from "./tasks.action";


export interface TasksState{
    tasks : Task[]
}
export const initialState:TasksState = {
tasks : []
}
export const tasksReducer = createReducer(
    initialState,
    on(addTask,(state,{task}) => {
        
        return {
            ...state,tasks : [...state.tasks,task]
        }
        
    }),
    on(updateTask,(state,{task}) => ({...state , tasks : state.tasks.map((t) => (t.id === task.id ? task : t))})),
    on(deleteTask,(state,{id}) => ({
        ...state, tasks : state.tasks.filter((t) => t.id !== id)
    }) ),
    on(loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks: tasks })),
    on(resetTasks, (state) => ({ ...state, tasks: [] }))
)