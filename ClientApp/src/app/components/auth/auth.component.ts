import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup;
  public registrationForm: FormGroup;
  public resetPasswordForm: FormGroup;
  public errors: string;
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { } 

  ngOnInit(): void {
    this.createForms();
  }

  private createForms() {
    this.loginForm = this.formBuilder.group({
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, [Validators.required, Validators.minLength(6)]]
    });

    this.registrationForm = this.formBuilder.group({
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, [Validators.required, Validators.pattern("(?=.*[0-9])(?=.*[!@#$%^&*_-])[0-9a-zA-Z!@#$%^&*_-]{6,}")]],
      "confirmPassword": [null, [Validators.required, this.confirmPassword]]
    });

    this.resetPasswordForm = this.formBuilder.group({
      "email": [null, [Validators.required, Validators.email]]
    })
  }

  public confirmPassword(control: AbstractControl): {[key: string]: boolean} {
    if (!control || !control.parent) return;

    let password = control.parent.get('password').value;
    let confirmPassword = control.parent.get('confirmPassword').value;

    if (!password || !confirmPassword) return;
    if (password !== confirmPassword)
      return {"confirmPassword": true};
  }

  public login(){
    this.authService.login(
      this.loginForm.get("email").value,
      this.loginForm.get("password").value
    ).subscribe(
      result => {
        console.log(result);
      },
      error => this.errors = error
    );
  }

  public registration(){
    let user: User = {email: this.registrationForm.get("email").value, password: this.registrationForm.get("password").value}
    this.authService.registration(user).subscribe(
      result => console.log(result),
      error => this.errors = error
    );
  }


}
