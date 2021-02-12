import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService, USER_NAME } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ){}

  public ngOnInit(): void{

  }
  
  public isLoggedIn(){
    return this.authService.isAuthenticated();
  }

  public getUserName(): string{
    return localStorage.getItem(USER_NAME);
  }

  public Logout(){
    return this.authService.logout();
  }
}
