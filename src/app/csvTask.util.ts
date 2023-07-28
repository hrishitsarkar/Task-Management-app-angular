import { Task } from "./task/tasks.model";
import * as Papa from 'papaparse';
export function convertToCSV(tasks: Task[]): string {
    const csv = Papa.unparse(tasks, {
      header: true,
      skipEmptyLines: true,
    });
    return csv;
  }