import { AuthAdapter, RegisterRequestAdapter } from '@/adapters';
import { AuthData, LoginResponse, RegisterData } from '@/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8082/auth';
  http = inject(HttpClient);

  login(user: AuthData): Observable<string> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, user)
      .pipe(map(AuthAdapter));
  }

  register(userData: RegisterData): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/register`,
      RegisterRequestAdapter(userData),
    );
  }
}
