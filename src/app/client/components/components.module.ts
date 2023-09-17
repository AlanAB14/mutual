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
import { PersonalesComponent } from './formulario/formularios/personales/personales.component';
import { PrendariosComponent } from './formulario/formularios/prendarios/prendarios.component';
import { AgropecuariosComponent } from './formulario/formularios/agropecuarios/agropecuarios.component';
import { EmpresarialesComponent } from './formulario/formularios/empresariales/empresariales.component';
import { EmpleadosPublicosComponent } from './formulario/formularios/empleados-publicos/empleados-publicos.component';
import { InversionBoxComponent } from './inversion-box/inversion-box.component';



@NgModule({
  declarations: [
    NuestrosServiciosComponent,
    PrestamoBoxComponent,
    TestimonioComponent,
    QuestionComponent,
    QuestionSectionComponent,
    FormularioComponent,
    PersonalesComponent,
    PrendariosComponent,
    AgropecuariosComponent,
    EmpresarialesComponent,
    EmpleadosPublicosComponent,
    InversionBoxComponent
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
    FormularioComponent,
    InversionBoxComponent
  ]
})
export class ComponentsModule { }
