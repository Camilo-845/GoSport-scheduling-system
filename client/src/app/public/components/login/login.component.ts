import { AppRoutes } from '@/app.routes';
import { CustomInputComponent } from '@/components';
import { AuthService, localKeys, LocalManagerService } from '@/services';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

interface loginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  authService = inject(AuthService);
  localManagerService = inject(LocalManagerService);
  router = inject(Router);

  loginForm = new FormGroup<loginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        await firstValueFrom(
          this.authService.login(this.loginForm.getRawValue()),
        )
          .then((token) => {
            this.localManagerService.setElement(localKeys.token, token);
            this.router.navigate([AppRoutes.private.root], {
              replaceUrl: true,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
      this.loginForm.reset();
    }
  }
}
