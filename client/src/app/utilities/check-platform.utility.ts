import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckPlatformUtility {
  private platformId = inject(PLATFORM_ID);

  checkIfServer() {
    return isPlatformServer(this.platformId);
  }

  checkIfBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
