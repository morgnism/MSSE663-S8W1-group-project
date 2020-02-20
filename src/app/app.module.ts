import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent} from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
// import { LoginFormComponent } from './loginform/loginform.component';
import { AuthInterceptor } from './auth.interceptor';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
  
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddRecipeComponent,
    RegisterComponent,
    ProfileComponent,
    // LoginFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
