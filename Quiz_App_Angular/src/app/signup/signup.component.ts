import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../user-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoginComponent, RouterLink, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private service: UserServiceService
  ) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]{5,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
    });
  }

  async submit() {
    if (this.signupForm.invalid) {
      this.openSnackBar('Please Enter the value correctly', 'Close', 3000);
      return;
    }

    const user = {
      userName: this.signupForm.value.userName,
      password: this.signupForm.value.password,
      roleId: 2,
      role: null
    };

    try {
      const response = await this.service.GetUser(user.userName);
      if (!response) {
        (await this.service.register(user)).subscribe({
          next: (response) => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.openSnackBar('Registration failed!!!', 'Close', 3000);
          }
        });
      } else {
        this.openSnackBar('This username already exists!!!', 'Close', 3000);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  get passwordHasUppercase() {
    return /[A-Z]/.test(this.signupForm.get('password')?.value);
  }

  get passwordHasLowercase() {
    return /[a-z]/.test(this.signupForm.get('password')?.value);
  }

  get passwordHasNumber() {
    return /\d/.test(this.signupForm.get('password')?.value);
  }

  get passwordHasSpecialChar() {
    return /[@$!%*?&]/.test(this.signupForm.get('password')?.value);
  }

  get passwordHasMinLength() {
    return this.signupForm.get('password')?.value.length >= 8;
  }
  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top'
    });
  }
}
