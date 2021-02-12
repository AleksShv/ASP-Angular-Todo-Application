import { Injectable } from "@angular/core";
import { Note } from "../models/note";

@Injectable({providedIn: 'root'})
export class SortingService{

    public sortById(todoList: Note[], order: number){
        todoList.sort((a, b) =>  order * (a.id - b.id));
    }

    public sortByTitle(todoList: Note[], order: number){
        todoList.sort((a, b) => order * a.title.localeCompare(b.title));
    }

    public sortByContent(todoList: Note[], order: number){
        todoList.sort((a, b) => order * a.content.localeCompare(b.content));
    }

    public sortByCompleted(todoList: Note[], order: number){
        todoList.sort((a, b) => Number(a.completed != b.completed));
    }

    public sortByDate(todoList: Note[], order: number){
        todoList.sort((a, b) => {
            if (a.createDate > b.createDate) return order * 1;
            if (a.createDate < b.createDate) return order * -1;
            return 0;
        });
    }
}