import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrestamosService } from '../../services/prestamos.service';

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  @Input() tipo!: string;
  @Input() titulo: string = '';

  formConsulta: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', [Validators.required,]],
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
      console.log(this.formConsulta.value)
    }
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
    console.log(data, this.titulo)
    this.prestamosService.savePrestamo(this.titulo, data)
      .subscribe( console.log )
    
  }
}
