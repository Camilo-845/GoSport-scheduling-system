import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  http = inject(HttpClient);
  public config: any;

  async load() {
    return firstValueFrom(this.http.get('/assets/config.json')).then((data) => {
      this.config = data;
      console.log('Config loaded:', this.config);
    });
  }

  get(key: string) {
    return this.config?.[key];
  }
}
