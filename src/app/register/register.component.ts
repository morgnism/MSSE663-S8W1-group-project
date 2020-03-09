import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    // private alertService: AlertService
  ) {
    if (this.authService.isLoggedIn()) {
      window.alert('Already Logged in!');
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  // convenience getter for easy access to form fields
  // We should take this out to some higher level and not repeate it for every form
  get field() { return this.registerForm.controls; }


  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.register( 
      this.field.firstName.value, 
      this.field.lastName.value, 
      this.field.username.value, 
      this.field.password.value
    )
      .pipe(first())
      .subscribe(
        data => {
          window.alert('Successfully registered and logged in!');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

}
