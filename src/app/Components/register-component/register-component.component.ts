import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../Interfaces/auth';
import { ToastrService } from 'ngx-toastr';

// Angular Material Modules
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register-component',
  standalone: true,
  templateUrl: './register-component.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class RegisterComponentComponent {
  registerform = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    avatar: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i),
    ]),
  });

  showspinner: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  // Getters for form controls
  get name() {
    return this.registerform.get('name');
  }

  get email() {
    return this.registerform.get('email');
  }

  get password() {
    return this.registerform.get('password');
  }

  get avatar() {
    return this.registerform.get('avatar');
  }

  login() {
    this.router.navigateByUrl('');
  }

  async onSubmit() {
    if (this.registerform.invalid) {
      this.registerform.markAllAsTouched();
      return;
    }

    this.showspinner = true;

    try {
      const postdata: User = this.registerform.value as User;
      await this.authService.registerUser(postdata);
      this.toast.success('Registration successful!');
      this.router.navigateByUrl('');
    } catch (error) {
      this.toast.error('Registration failed. Please try again.');
    } finally {
      this.showspinner = false;
    }
  }
}
