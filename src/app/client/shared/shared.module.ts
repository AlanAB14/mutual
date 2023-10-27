import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedGlobalModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedGlobalModule,
    RouterModule,
    SlickCarouselModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
