import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";

export interface Todo{
    id?: number;
    title: string;
    completed?: boolean;
    date?: any;
}

@Injectable({providedIn: 'root'})
export class DeskService{
    private url = "http://localhost:63693/api/desk/";
    public todoList: Todo[] = [];

    constructor(private http: HttpClient){
    }

    public getItem(id: number): Observable<any>{
        return this.http.get(this.url + id);
    }

    public getAllItems(): Observable<any>{
        return this.http.get(this.url);
    }

    public addItem(todo: Todo): Observable<any>{
        return this.http.post(this.url, todo);
    }

    public removeItem(id: number): Observable<any>{   
        return this.http.delete(this.url + id);
    }

    public onToggle(id: number): Observable<any>{
        return this.http.post(this.url + "complete/" + id, id);
    }

    public removeAnyItems(): Observable<any>{
        let toDelete = this.todoList.filter(i => i.completed === true);
        return this.http.post(this.url + "delete/", toDelete);
    }
}