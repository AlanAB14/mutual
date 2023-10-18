import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { delay } from 'rxjs';
import { QuestionsService } from 'src/app/client/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {
  showTable: boolean = false;
  pagesize = 5;
  titleColumns: string[] = ['id', 'pregunta', 'respuesta', 'actions'];
  spinner: boolean = false;
  showAllCategories: boolean = false;
  categoriesPreguntas!: any[];
  preguntas!: any[];
  preguntasForm: FormGroup = this.fb.group({
    category: [],
  });

  filterForm: FormGroup = this.fb.group({
    filterField: [''],
  });

  constructor(
    // private _dialog: MatDialog,
    // private _toast: ToastrService,
    private questionService: QuestionsService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCategoriesPreguntas();
  }

  getCategoriesPreguntas() {
    this.questionService.getCategoriesQuestions()
      .subscribe(resp => {
        console.log(resp)
        this.categoriesPreguntas = resp
      })
  }

  categorySelected() {
    this.obtenerPreguntas(this.preguntasForm.value['category'].id)
  }

  obtenerPreguntas(idCategory: number) {
    this.showTable = false;
    this.spinner = true;
    this.questionService.getQuestions(idCategory)
      .pipe(delay(250))
      .subscribe((resp) => {
        this.spinner = false;
        this.renderPreguntas(resp);
        this.showTable = true;
      },
        (error) => {
          this.spinner = false;
          this.showTable = false;
        })
  }

  renderPreguntas(preguntas: any) {
    console.log(preguntas)
    this.preguntas = preguntas;
  }

  addCategoria() {
    Swal.fire({
      text: 'Agregue una nueva categoría',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.setCategoria(result.value)
        this.preguntasForm.reset();
        this.showTable = false
      }
    })
  }

  deleteCategoria() {
    Swal.fire({
      text: '¿Está seguro de eliminar la categoría?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeCategoria(this.preguntasForm.value.category.id)
        this.preguntasForm.reset();
        this.showTable = false
      }
    })
  }

  editCategoria() {
    Swal.fire({
      text: 'Edite el nombre de la categoría',
      input: 'text',
      inputValue: this.preguntasForm.value.category.nombre,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateCategoria(result.value)
        this.preguntasForm.reset();
        this.showTable = false
      }
    })
  }

  updateCategoria(nombre: string) {
    this.questionService.updateCategoria(this.preguntasForm.value.category.id, nombre)
      .subscribe((resp) => {
        Swal.fire({
          title: `${resp.nombre} fue actualizada con éxito`
        })
        this.getCategoriesPreguntas();
      })
  }

  setCategoria(nombre: string) {
    this.questionService.setCategoria(nombre)
      .subscribe((resp) => {
        Swal.fire({
          title: `${resp.nombre} fue agregada con éxito`
        })
        this.getCategoriesPreguntas();
      })
  }

  removeCategoria(id: number) {
    this.questionService.deleteCategoria(id)
      .subscribe((resp) => {
        Swal.fire({
          title: `Categoria eliminada con éxito`
        })
        this.getCategoriesPreguntas();
      })
  }

  addPregunta() {
    console.log(this.preguntasForm.value['category'])
    Swal.fire({
      title: `Agregar pregunta a la categoria ${this.preguntasForm.value['category'].nombre}`,
      showCancelButton: true,
      html:
        '<div class="inputs-ta-swal">' +
        `<textarea id="swal-input1"></textarea>` +
        `<textarea id="swal-input2"></textarea>` +
        '<div>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1'),
          document.getElementById('swal-input2')
        ]
      }
    }).then((result) => {
      if (result.isConfirmed && (result.value[0].value !== '') && (result.value[1].value !== '')) {
        const body = {
          categoria_id: this.preguntasForm.value['category'].id,
          pregunta: result.value[0].value,
          respuesta: result.value[1].value
        }
        this.questionService.addQuestion(body)
          .subscribe((resp: any) => {
            this.obtenerPreguntas(resp.categoria_id)
            Swal.fire('', 'Pregunta agregada con éxito', 'success')
          },
          (error) => {
            Swal.fire('', 'Ocurrió un error al agregar pregunta', 'error');
            console.log(error)
          })

      }
    })
  }
  applyFilter(event: any) {

  }

  editPregunta(element: any) {
    Swal.fire({
      title: 'Actualizar la pregunta',
      showCancelButton: true,
      html:
        '<div class="inputs-ta-swal">' +
        `<textarea id="swal-input1">${element.pregunta}</textarea>` +
        `<textarea id="swal-input2">${element.respuesta}</textarea>` +
        '<div>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1'),
          document.getElementById('swal-input2')
        ]
      }
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed && (result.value[0].value !== '') && (result.value[1].value !== '')) {
        if (result.value[0].value !== element.pregunta || result.value[1].value !== element.respuesta) {
          const body = {
            categoria_id: element.categoria_id,
            pregunta: result.value[0].value,
            respuesta: result.value[1].value
          }
          this.questionService.updateQuestion(element.id, body)
            .subscribe((resp: any) => {
              this.obtenerPreguntas(resp.categoria_id)
              Swal.fire('', 'Pregunta modificada con éxito', 'success')
            },
            (error) => {
              Swal.fire('', 'Ocurrió un error al modificar la pregunta', 'error');
              console.log(error)
            })
        } else {
          Swal.close();
        }
      }
    })
  }

  removePregunta(element: any) {
    Swal.fire({
      text: '¿Quieres eliminar la pregunta?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.removeQuestion(element.id)
          .subscribe(resp => {
            console.log(resp)
            this.obtenerPreguntas(element.categoria_id)
            Swal.fire('', 'Pregunta eliminada con éxito', 'success')
          },
          (error) => {
            Swal.fire('', 'Ocurrió un error al eliminar la pregunta', 'error');
            console.log(error)
          })
      } else if (result.isDenied) {
        Swal.close()
      }
    })
  }


}
