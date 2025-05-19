import { AuthAdapter, RegisterRequestAdapter } from '@/adapters';
import { AuthData, LoginResponse, NewPassword, RegisterData } from '@/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppInitService } from './app-init.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  configService = inject(AppInitService);
  private readonly baseUrl = `${environment.apiUrl}/auth`;
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
  changePassword(newPasswordData: NewPassword) {
    return this.http.put(`${this.baseUrl}/changePassword`, newPasswordData);
  }
  constructor() {
    this.baseUrl = `${this.configService.get('apiUrl')}/auth`;
  }
}
