import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuestrosServiciosComponent } from './nuestros-servicios/nuestros-servicios.component';
import { PrestamoBoxComponent } from './prestamo-box/prestamo-box.component';
import { SharedGlobalModule } from 'src/app/shared/shared.module';
import { TestimonioComponent } from './testimonio/testimonio.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { QuestionComponent } from './question/question.component';
import { QuestionSectionComponent } from './question-section/question-section.component';



@NgModule({
  declarations: [
    NuestrosServiciosComponent,
    PrestamoBoxComponent,
    TestimonioComponent,
    QuestionComponent,
    QuestionSectionComponent
  ],
  imports: [
    CommonModule,
    SharedGlobalModule,
    SlickCarouselModule
  ],
  exports: [
    NuestrosServiciosComponent,
    PrestamoBoxComponent,
    TestimonioComponent,
    QuestionComponent,
    QuestionSectionComponent
  ]
})
export class ComponentsModule { }
