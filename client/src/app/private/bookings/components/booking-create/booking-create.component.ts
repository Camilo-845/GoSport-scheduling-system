import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookingService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '@/app.routes';
import { UserService } from '@/private/user/services/user.service';
import { firstValueFrom } from 'rxjs';
import { CustomInputComponent } from '@/components';
import { BackButtonComponent } from '@/components/back-button/back-button.component';

interface BookingCreateForm {
  fecha: FormControl<string>;
  horaInicio: FormControl<string>;
  horaFin: FormControl<string>;
}

@Component({
  selector: 'app-booking-create',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent, BackButtonComponent],
  templateUrl: './booking-create.component.html',
  styleUrl: './booking-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCreateComponent {
  bookingService = inject(BookingService);
  userService = inject(UserService);
  router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  courtId = this.route.snapshot.queryParamMap.get('courtId');
  backRoute = [
    AppRoutes.private.root,
    AppRoutes.private.courts,
    this.courtId ?? '0',
  ];
  userId = computed(() => this.userService.state().user?.idUsuario);

  createBookingForm = new FormGroup<BookingCreateForm>({
    fecha: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    horaInicio: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    horaFin: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  async onSubmit() {
    if (this.createBookingForm.valid && this.courtId) {
      const bookingData = {
        ...this.createBookingForm.getRawValue(),
        idCancha: Number(this.courtId),
        idUsuario: this.userId() ?? 1,
      };
      await firstValueFrom(this.bookingService.createBooking(bookingData));
      this.router.navigate(this.backRoute);
    }
  }
}
