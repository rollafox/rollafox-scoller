import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigTitleComponent } from './big-title/big-title.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ScaleComponent } from './scale/scale.component';
import { FloatingBorderPageComponent } from './floating-border-page/floating-border-page.component';

@NgModule({
  declarations: [
    BigTitleComponent,
    CardComponent,
    FooterComponent,
    HeaderComponent,
    ScaleComponent,
    FloatingBorderPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BigTitleComponent,
    CardComponent,
    FooterComponent,
    HeaderComponent,
    ScaleComponent,
    FloatingBorderPageComponent
  ]
})
export class ComponentsModule { }
