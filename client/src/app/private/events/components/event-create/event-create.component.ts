import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventService } from '../../services';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CustomInputComponent } from '@/components';
import { AppRoutes } from '@/app.routes';

interface eventCreateForm {
  nombre: FormControl<string>;
  fecha: FormControl<string>;
  horaInicio: FormControl<string>;
  idCancha: FormControl<string>;
}
@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCreateComponent {
  eventService = inject(EventService);
  router = inject(Router);

  createEventForm = new FormGroup<eventCreateForm>({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    fecha: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    horaInicio: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    idCancha: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  async onSubmit() {
    if (this.createEventForm.valid) {
      try {
        await firstValueFrom(
          this.eventService.createEvent(this.createEventForm.getRawValue()),
        );
        this.router.navigate([
          `${AppRoutes.private.root}/${AppRoutes.private.events.root}`,
        ]);
      } catch (error) {}
    }
    this.createEventForm.reset();
  }
}
