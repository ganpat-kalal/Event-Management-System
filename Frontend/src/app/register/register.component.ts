import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
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
    this.registerForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: this.checkPasswords }
    );
  }

  /**
   * The function `checkPasswords` compares the password and confirm password values in a form group
   * and returns an error if they do not match.
   * @param {FormGroup} group - The `group` parameter in the `checkPasswords` function is a `FormGroup`
   * object that contains form controls, such as `password` and `confirmPassword`, that you want to
   * compare for equality. The function retrieves the values of the `password` and `confirmPassword`
   * controls from the `
   * @returns If the `password` and `confirmPassword` values in the `group` FormGroup are the same,
   * then `null` is returned. Otherwise, an object with the key `passwordsMismatch` set to `true` is
   * returned.
   */
  checkPasswords(group: FormGroup) {
    const password = group?.get('password')?.value;
    const confirmPassword = group?.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**
   * The onSubmit function handles form submission for user registration, displaying error messages if
   * needed.
   * @returns If the `registerForm` is invalid, the `onSubmit()` function will return without further
   * execution. If the form is valid, the function will proceed to call the `register()` method of the
   * `authService` and subscribe to the observable. The function does not explicitly return a value,
   * but it performs the necessary actions based on the form validity and the result of the
   * registration process.
   */
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe(
      (data) => {
        this.router.navigate(['/login']);
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
