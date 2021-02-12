import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { RESOURCE_API_URL } from "../app-injection-tokens";
import { Note } from "../models/note";

@Injectable({providedIn: 'root'})
export class BoardService{
    public todoList: Note[] = [];

    constructor(
        private http: HttpClient,
        @Inject(RESOURCE_API_URL) private apiUrl: string
    ){}

    public getItem(id: number): Observable<any>{
        return this.http.get(`${this.apiUrl}api/note/${id}`);
    }

    public getAllItems(): Observable<any>{
        return this.http.get(`${this.apiUrl}api/note/`);
    }

    public addItem(note: Note): Observable<any>{
        return this.http.post(`${this.apiUrl}api/note/`, note);
    }

    public removeItem(id: number): Observable<any>{   
        return this.http.delete(`${this.apiUrl}api/note/${id}`);
    }

    public onToggle(id: number): Observable<any>{
        return this.http.post(`${this.apiUrl}api/note/complete/${id}`, id);
    }

    public removeAnyItems(): Observable<any>{
        let toDelete = this.todoList.filter(i => i.completed === true);
        return this.http.post(`${this.apiUrl}api/note/delete/`, toDelete);
    }
    
    public updateItem(note: Note): Observable<any>{
        return this.http.post(`${this.apiUrl}api/note/update`, note);
    }
}