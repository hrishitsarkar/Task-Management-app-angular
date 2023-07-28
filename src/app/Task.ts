export class Task{
    id : string;
    title :string;
    desc:string;
    date : string;
    priority : string;
    status : string;
    createdOn : string;
    updatedOn : string;

    constructor(id: string, title: string, desc: string, date: string, priority: string, status: string,createdOn : string,updatedOn : string) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.priority = priority;
        this.status = status;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;

    }
}