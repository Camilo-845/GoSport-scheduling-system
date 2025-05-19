// src/app/app.initializer.ts
import { APP_INITIALIZER } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AppInitService } from './services';

export function appInitializerFactory(
  configService: AppInitService,
): () => Promise<void> {
  return () => configService.load();
}

export const appInitializerProviders = [
  provideHttpClient(),
  AppInitService,
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: [AppInitService],
    multi: true,
  },
];
