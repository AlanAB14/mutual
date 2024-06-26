import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrestamosService } from '../../services/prestamos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  @Input() tipo!: string;
  @Input() titulo: string = '';
  @Input() tipoInversion!: string;
  enviandoData!: boolean;
  enviandoDataConsulta: boolean = false;

  formConsulta: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: [''],
    celularArea: ['', [Validators.required,]],
    celularNumero: ['', [Validators.required,]],
    codPostal: ['', [Validators.required]],
    ciudad: ['', Validators.required],
    consulta: ['', Validators.required],
  })

  constructor(private fb: FormBuilder,
    private prestamosService: PrestamosService) { }

  ngOnInit(): void {
    console.log(this.tipo)
  }

  sendData() {
    this.formConsulta.markAllAsTouched();
    console.log(this.formConsulta.valid)
    if (this.formConsulta.valid) {
      this.creaCampoCelular();
      console.log(this.formConsulta.value)
      this.enviandoDataConsulta = true;
      this.sendFormulario(this.formConsulta.value)
      this.formConsulta.reset()
    }
  }

  creaCampoCelular() {
    this.formConsulta.patchValue({
      celular: `${this.formConsulta.value.celularArea}-${this.formConsulta.value.celularNumero}`
    })
  }

  onInputChange(event: any, input: string) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    if (this.tipo === 'consulta') {
      this.formConsulta.get(input)!.setValue(valor);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    const tecla = event.key;
    const esNumero = /[0-9]/.test(tecla);
    const esTeclaControl = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(tecla);

    if (!esNumero && !esTeclaControl) {
      event.preventDefault();
    }
  }

  checkIfError(campo: string) {
    if (this.formConsulta.get(campo)!.invalid && (this.formConsulta.get(campo)!.dirty || this.formConsulta.get(campo)!.touched)) {
      return true;
    } else {
      return false;
    }
  }

  sendFormulario(data: any) {
    const tituloAEnviar =  `${this.titulo} ${ this.tipoInversion ? `- ${ this.tipoInversion }` : ''}`;
    this.prestamosService.savePrestamo(tituloAEnviar, data)!
      .subscribe((suscripcion: any) => {
        if (suscripcion.id) {
          Swal.fire({
            icon: 'success',
            text: 'Tu solicitud se ha cargado con exito',
            showConfirmButton: true,
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Ocurrió un error, comuniquesé con nosotros',
            showConfirmButton: true,
          })
        }
        this.enviandoData = false;
        this.enviandoDataConsulta = false;
      })

  }
  
}
