import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { bootstrapApplication } from '@angular/platform-browser';

@NgModule({
  imports: [
    ServerModule,
  ]
})
export class AppServerModule {
  static bootstrap = () => bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
      ...(appConfig.providers || []),
      { provide: 'RENDER_MODE', useValue: 'prerender' }
    ]
  });
} 