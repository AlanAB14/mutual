import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-personales',
  templateUrl: './personales.component.html',
  styleUrls: ['./personales.component.scss']
})
export class PersonalesComponent {

  formPersonales: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    monto: ['', [Validators.required,]],
    montoOtro: [{ value: '', disabled: true }, [Validators.required]],
    financiacion: ['', [Validators.required,]],
    celular: ['', [Validators.required,]],
    dni: ['', [Validators.required,]],
    codPostal: ['', [Validators.required]],
    ciudad: ['', Validators.required],
    filial: ['', Validators.required],
    consulta: [''],
  })

  constructor(private fb: FormBuilder) { }

  sendData() {
    this.formPersonales.markAllAsTouched();
    console.log(this.formPersonales.valid)
    if (this.formPersonales.valid) {
      console.log(this.formPersonales.value)
    }
  }

  verificarCampo() {
    if (this.formPersonales.get('monto')!.value === 'otro') {
      this.formPersonales.get('montoOtro')?.enable();
    } else {
      this.formPersonales.get('montoOtro')?.disable();
      this.formPersonales.get('montoOtro')?.reset();
    }
  }

  onInputChange(event: any, input: string) {
    if (input === 'montoOtro' || input === 'dni') {
      let value = event.target.value;
      value = value.replace(/[,\.]/g, '');
      value = parseFloat(value).toLocaleString('es-ES');
      this.formPersonales.get(input)!.setValue(value);
    }else {
      const valor = event.target.value.replace(/[^0-9]/g, '');
      this.formPersonales.get(input)!.setValue(valor);
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
    if (this.formPersonales.get(campo)!.invalid && (this.formPersonales.get(campo)!.dirty || this.formPersonales.get(campo)!.touched)) {
      return true;
    } else {
      return false;
    }
  }

}
