import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * The onSubmit function handles form submission, validates the form, attempts to log in using
   * authentication service, and displays error message if login fails.
   * @returns If the `loginForm` is invalid, the `onSubmit()` function will return without further
   * execution. If the form is valid, the function will attempt to log in using the credentials
   * provided and handle the response accordingly.
   */
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(this.f['username'].value, this.f['password'].value)
      .subscribe(
        (data) => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = error?.error?.message;
          this.snackBar.open(error?.error?.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.loading = false;
        }
      );
  }
}
