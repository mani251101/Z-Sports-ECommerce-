// Title       : Z-SPORTS
// Author      : Manikandan K
// Created At  : 21/04/2023
// Updated At  : 30/07/2023
// Reviewed At : 02/08/2023
// Reviewed By :

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
