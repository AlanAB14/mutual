import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-empresarial',
  templateUrl: './empresariales.component.html',
  styleUrls: ['./empresariales.component.scss']
})
export class EmpresarialesComponent {

  @Input() enviandoData: boolean = false;
  @Output() envioForm = new EventEmitter<any>();

  formEmpresarial: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', [Validators.required,]],
    dni: ['', [Validators.required,]],
    codPostal: ['', [Validators.required]],
    ciudad: ['', Validators.required],
    monto: ['', [Validators.required,]],
    plazo: ['', [Validators.required,]],
    filial: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

  sendData() {
    this.formEmpresarial.markAllAsTouched();
    console.log(this.formEmpresarial.valid)
    if (this.formEmpresarial.valid) {
      console.log(this.formEmpresarial.value)
      this.envioForm.emit(this.formEmpresarial.value);
      this.enviandoData = true
      this.formEmpresarial.reset();
    }
  }

  onInputChange(event: any, input: string) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    this.formEmpresarial.get(input)!.setValue(valor);
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
    if (this.formEmpresarial.get(campo)!.invalid && (this.formEmpresarial.get(campo)!.dirty || this.formEmpresarial.get(campo)!.touched)) {
      return true;
    } else {
      return false;
    }
  }
}
