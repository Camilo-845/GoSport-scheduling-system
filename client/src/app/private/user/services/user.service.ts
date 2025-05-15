import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UpdateUser, User } from '../models';
import { catchError, of } from 'rxjs';
import { updateUserRequestAdapter } from '@/adapters/user.adapter';

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

  updateUserIfo(userData: UpdateUser) {
    return this.http.put<void>(
      this.baseUrl,
      updateUserRequestAdapter(userData),
    );
  }
}
