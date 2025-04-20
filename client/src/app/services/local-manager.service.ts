import { inject, Injectable } from '@angular/core';
import { CheckPlatformUtility } from '../utilities';

export enum localKeys {
  token = 'token',
}

@Injectable({
  providedIn: 'root',
})
export class LocalManagerService {
  checkPlatform = inject(CheckPlatformUtility);
  getElement(key: localKeys): string | null {
    if (this.checkPlatform.checkIfServer()) {
      return null;
    }
    return localStorage.getItem(key);
  }

  setElement(key: localKeys, value: string): void {
    if (this.checkPlatform.checkIfBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  clearStorage(): void {
    if (this.checkPlatform.checkIfBrowser()) {
      localStorage.clear();
    }
  }
}
