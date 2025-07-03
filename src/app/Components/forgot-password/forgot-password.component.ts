import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  showspinner: boolean = false;

  loginpage() {
    this.router.navigateByUrl('/');
  }

  async onSubmit() {
    this.showspinner = true;

    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      this.showspinner = false;
      return;
    }

    try {
      const email = this.forgotForm.value.email;
      await this.authService.requestPasswordReset(email);
      this.toastr.success('Password reset link sent to your email.');
    } catch (err) {
      this.toastr.error('Failed to send password reset link.');
    } finally {
      this.showspinner = false;
    }
  }
}
