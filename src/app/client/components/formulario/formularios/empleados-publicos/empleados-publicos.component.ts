import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filiales, montos } from 'src/environments/environment';

@Component({
  selector: 'form-empleados-publicos',
  templateUrl: './empleados-publicos.component.html',
  styleUrls: ['./empleados-publicos.component.scss']
})
export class EmpleadosPublicosComponent {
  @Input() enviandoData: boolean = false;
  @Output() envioForm = new EventEmitter<any>();

  montos: string[] = montos
  filiales: string[] = filiales;


  formEmpPublicos: FormGroup = this.fb.group({
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
    this.formEmpPublicos.markAllAsTouched();
    console.log(this.formEmpPublicos.valid)
    if (this.formEmpPublicos.valid) {
      this.envioForm.emit(this.formEmpPublicos.value);
      this.enviandoData = true
      this.formEmpPublicos.reset();
    }
  }

  verificarCampo() {
    if (this.formEmpPublicos.get('monto')!.value === 'otro') {
      this.formEmpPublicos.get('montoOtro')?.enable();
    } else {
      this.formEmpPublicos.get('montoOtro')?.disable();
      this.formEmpPublicos.get('montoOtro')?.reset();
    }
  }

  onInputChange(event: any, input: string) {
    if (input === 'montoOtro' || input === 'dni') {
      let value = event.target.value;
      value = value.replace(/[,\.]/g, '');
      value = parseFloat(value).toLocaleString('es-ES');
      this.formEmpPublicos.get(input)!.setValue(value);
    }else {
      const valor = event.target.value.replace(/[^0-9]/g, '');
      this.formEmpPublicos.get(input)!.setValue(valor);
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
    if (this.formEmpPublicos.get(campo)!.invalid && (this.formEmpPublicos.get(campo)!.dirty || this.formEmpPublicos.get(campo)!.touched)) {
      return true;
    } else {
      return false;
    }
  }

}
