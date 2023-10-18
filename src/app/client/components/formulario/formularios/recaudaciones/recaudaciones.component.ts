import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filiales, montos } from 'src/environments/environment';

@Component({
  selector: 'form-recaudaciones',
  templateUrl: './recaudaciones.component.html',
  styleUrls: ['./recaudaciones.component.scss']
})
export class RecaudacionesComponent {

  montos: string[] = montos;
  filiales: string[] = filiales;

  @Input() enviandoData: boolean = false;
  @Output() envioForm = new EventEmitter<any>();

  formRecaudaciones: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', [Validators.required,]],
    dni: ['', [Validators.required,]],
    codPostal: ['', [Validators.required]],
    ciudad: ['', Validators.required],
    interes: ['', [Validators.required,]],
    filial: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

  sendData() {
    this.formRecaudaciones.markAllAsTouched();
    console.log(this.formRecaudaciones.valid)
    if (this.formRecaudaciones.valid) {
      console.log(this.formRecaudaciones.value)
      this.envioForm.emit(this.formRecaudaciones.value);
      this.enviandoData = true
      this.formRecaudaciones.reset();
    }
  }

  onInputChange(event: any, input: string) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    this.formRecaudaciones.get(input)!.setValue(valor);
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
    if (this.formRecaudaciones.get(campo)!.invalid && (this.formRecaudaciones.get(campo)!.dirty || this.formRecaudaciones.get(campo)!.touched)) {
      return true;
    } else {
      return false;
    }
  }
}
