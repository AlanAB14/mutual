import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuestrosServiciosComponent } from './nuestros-servicios/nuestros-servicios.component';
import { PrestamoBoxComponent } from './prestamo-box/prestamo-box.component';
import { SharedGlobalModule } from 'src/app/shared/shared.module';
import { TestimonioComponent } from './testimonio/testimonio.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { QuestionComponent } from './question/question.component';
import { QuestionSectionComponent } from './question-section/question-section.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NuestrosServiciosComponent,
    PrestamoBoxComponent,
    TestimonioComponent,
    QuestionComponent,
    QuestionSectionComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    SharedGlobalModule,
    SlickCarouselModule,
    ReactiveFormsModule
  ],
  exports: [
    NuestrosServiciosComponent,
    PrestamoBoxComponent,
    TestimonioComponent,
    QuestionComponent,
    QuestionSectionComponent,
    FormularioComponent
  ]
})
export class ComponentsModule { }
