import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from '@app/routing/routing.module';
import { SkillsService } from '@app/services/skills/skills.service';
import { AboutComponent } from '@pages/about/about.component';
import { ContactComponent } from '@pages/contact/contact.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ProjectsComponent } from '@pages/projects/projects.component';
import { ProjectsModule } from '@pages/projects/projects.module';
import { VerticalPageTransitionsComponent } from './routing/page-transitions/vertical-slide/page-transitions.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LandingComponent,
    NotFoundComponent,
    ContactComponent,
    VerticalPageTransitionsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'pmp' }),
    ProjectsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    RoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    SkillsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = !isPlatformBrowser(platformId) ?
      'on the server' : 'in the browser';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
