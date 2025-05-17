import { AppRoutes } from '@/app.routes';
import { CustomInputComponent } from '@/components';
import { BackButtonComponent } from '@/components/back-button/back-button.component';
import { AuthService } from '@/services';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

interface changePasswordForm {
  oldPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmNewPassword: FormControl<string>;
}

const passwordMatchValidator: ValidatorFn = (
  group: AbstractControl,
): ValidationErrors | null => {
  const newPassword = group.get('newPassword')?.value;
  const confirmNewPassword = group.get('confirmNewPassword')?.value;

  return newPassword === confirmNewPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent, BackButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  authService = inject(AuthService);
  router = inject(Router);

  backRoute = [AppRoutes.private.root, AppRoutes.private.user];

  changePasswordForm = new FormGroup<changePasswordForm>(
    {
      oldPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      newPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      confirmNewPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      validators: [passwordMatchValidator],
    },
  );

  async onSubmit() {
    if (this.changePasswordForm.valid) {
      try {
        await firstValueFrom(
          this.authService.changePassword(
            this.changePasswordForm.getRawValue(),
          ),
        ).then(() => {
          this.router.navigate([
            `${AppRoutes.private.root}/${AppRoutes.private.user}`,
          ]);
        });
      } catch (error) {
        console.error(error);
      }
      this.changePasswordForm.reset();
    }
  }
}
