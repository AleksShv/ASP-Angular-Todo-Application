import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardFilterPipe } from './pipes/board-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AUTH_API_URL, RESOURCE_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt'
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { AutosizeModule } from 'ngx-autosize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: '', component: BoardComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
]

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardFormComponent,
    BoardFilterPipe,
    AuthComponent
  ],
  imports: [
    AutosizeModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.allowedDomains
      }   
    }),
  ],
  providers: [{
    provide: AUTH_API_URL,
    useValue: environment.authApi
  },
  {
    provide: RESOURCE_API_URL,
    useValue: environment.resourceApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
