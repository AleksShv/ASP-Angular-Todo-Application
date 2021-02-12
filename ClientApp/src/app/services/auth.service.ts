import { HttpClient } from "@angular/common/http";
import { Token } from "../models/token";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { AUTH_API_URL } from "../app-injection-tokens";
import { tap } from "rxjs/operators";
import { User } from "../models/user";

export const ACCESS_TOKEN_KEY = 'todo_access_token';
export const USER_NAME = 'user_name'

@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(
        private http: HttpClient,
        @Inject(AUTH_API_URL) private apiUrl: string,
        private jwtHelper: JwtHelperService,
        private router: Router
    ) {}

    public login(email: string, password: string): Observable<Token>{
        return this.http.post<Token>(`${this.apiUrl}api/auth/login`, {
            email, password
        }).pipe(
            tap(token => {
                localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
                localStorage.setItem(USER_NAME, email);
                this.router.navigate(['']);
            })
        );
    }

    public isAuthenticated(): boolean{
        var token = localStorage.getItem(ACCESS_TOKEN_KEY);
        return token && !this.jwtHelper.isTokenExpired(token);
    }
    
    public logout(){
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(USER_NAME);
        this.router.navigate(['auth']);
    }

    public registration(user: User): Observable<any> {
        return this.http.post(`${this.apiUrl}api/auth/registration`, user);
    }

    public getName(): Observable<any>{
        return;
    }
}