import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CustomInputComponent } from '@/components';
import { Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';

interface updateUserForm {
  nombre: FormControl<string>;
  apellido: FormControl<string>;
  telefono: FormControl<string>;
}

@Component({
  selector: 'app-update-user-info',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './update-user-info.component.html',
  styleUrl: './update-user-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserInfoComponent {
  userService = inject(UserService);
  userData = computed(() => this.userService.state().user);
  router = inject(Router);

  updateForm = new FormGroup<updateUserForm>({
    nombre: new FormControl(this.userData()?.nombre ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    apellido: new FormControl(this.userData()?.apellido ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    telefono: new FormControl(this.userData()?.telefono ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
    }),
  });

  async onSubmit() {
    if (this.updateForm.valid) {
      try {
        await firstValueFrom(
          this.userService.updateUserIfo(this.updateForm.getRawValue()),
        )
          .then(() => {
            this.router.navigate([
              `${AppRoutes.private.root}/${AppRoutes.private.user}`,
            ]);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
      this.updateForm.reset();
    }
  }
}
