import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '@app/components/components.module';
import { HorizontalPageTransitionsComponent } from '@app/routes/page-transitions/horizontal-slide/page-transitions.component';
import { ProjectPageStateManagerService } from '@app/services/state-management/project-page-state-manager.service';

import { DvtInternalComponent } from './dvt-internal/dvt-internal.component';
import { FrigginCoffeeComponent } from './friggin-coffee/friggin-coffee.component';
import { HugeTelecomComponent } from './huge-telecom/huge-telecom.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { TrackerComponent } from './tracker/tracker.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    HorizontalPageTransitionsComponent,
    TrackerComponent,
    HugeTelecomComponent,
    FrigginCoffeeComponent,
    DvtInternalComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ProjectsRoutingModule
  ],
  providers: [
    ProjectPageStateManagerService
  ],
  exports: []
})
export class ProjectsModule { }
