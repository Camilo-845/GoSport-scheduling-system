import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  state = signal<{ user: User | null }>({ user: null });

  private readonly baseUrl = `${environment.apiUrl}/user`;

  http = inject(HttpClient);

  getUserInfo() {
    this.http
      .get<User>(this.baseUrl)
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
      )
      .subscribe((result) => {
        if (result) {
          this.state.update((state) => {
            return { ...state, user: result };
          });
        }
      });
  }
}
