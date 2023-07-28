import { Task } from "./task/tasks.model";

export function compareTasksByDate(a: Task, b: Task): number {
   
    if (a.date < b.date) {
      return -1;
    } else if (a.date > b.date) {
      return 1;
    } else {
      return 0;
    }
  }
  
  
  export function compareTasksByPriority(a: Task, b: Task): number {
    // Assigning numeric values to priorities for comparison
    const priorityOrder = ['Low','Medium','High'];
    const priorityA = priorityOrder.indexOf(a.priority);
    const priorityB = priorityOrder.indexOf(b.priority);

    if(priorityA < priorityB){
        return 1;
    }else if(priorityA > priorityB){
        return -1;
    }else{
        return 0;
    }
}
export function compareTasksByStatus(a: Task, b: Task): number {
    // Assigning numeric values to priorities for comparison
    const priorityOrder = ['Completed','In-Progress','Pending'];
    const priorityA = priorityOrder.indexOf(a.priority);
    const priorityB = priorityOrder.indexOf(b.priority);

    if(priorityA < priorityB){
        return 1;
    }else if(priorityA > priorityB){
        return -1;
    }else{
        return 0;
    }
}
