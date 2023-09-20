import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-agropecuario',
  templateUrl: './agropecuarios.component.html',
  styleUrls: ['./agropecuarios.component.scss']
})
export class AgropecuariosComponent {
  @Input() enviandoData: boolean = false;
  @Output() envioForm = new EventEmitter<any>();

  formAgropecuario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    monto: ['', [Validators.required,]],
    plazo: ['', [Validators.required,]],
    celular: ['', [Validators.required,]],
    dni: ['', [Validators.required,]],
    codPostal: ['', [Validators.required]],
    ciudad: ['', Validators.required],
    filial: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

  sendData() {
    this.formAgropecuario.markAllAsTouched();
    console.log(this.formAgropecuario.valid)
    if (this.formAgropecuario.valid) {
      this.envioForm.emit(this.formAgropecuario.value);
      this.enviandoData = true
      this.formAgropecuario.reset();
    }
  }

  onInputChange(event: any, input: string) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    this.formAgropecuario.get(input)!.setValue(valor);
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
    if (this.formAgropecuario.get(campo)!.invalid && (this.formAgropecuario.get(campo)!.dirty || this.formAgropecuario.get(campo)!.touched)) {
      return true;
    } else {
      return false;
    }
  }
}
