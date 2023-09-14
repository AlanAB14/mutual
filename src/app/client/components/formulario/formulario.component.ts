import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  @Input() tipo!: string;

  formConsulta: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', [Validators.required,]],
    codPostal: ['', [Validators.required]],
    ciudad: ['', Validators.required],
    consulta: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

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
}
