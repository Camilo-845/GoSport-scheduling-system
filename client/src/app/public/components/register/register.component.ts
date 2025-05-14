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
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '@/components/footer/footer.component';

interface registerForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  number: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomInputComponent,
    NavBarComponent,
    FooterComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  authService = inject(AuthService);
  localManagerService = inject(LocalManagerService);
  router = inject(Router);

  registerForm = new FormGroup<registerForm>({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    number: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[\\d]*'),
      ],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        await firstValueFrom(
          this.authService.register(this.registerForm.getRawValue()),
        )
          .then(async () => {
            await firstValueFrom(
              this.authService.login(this.registerForm.getRawValue()),
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
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
      this.registerForm.reset();
    }
  }
}
