import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filiales, financiacion } from 'src/environments/environment';

@Component({
  selector: 'form-prendario',
  templateUrl: './prendarios.component.html',
  styleUrls: ['./prendarios.component.scss']
})
export class PrendariosComponent {

  filiales: string[] = filiales;
  financiaciones: string[] = financiacion;

  @Input() enviandoData: boolean = false;
  @Output() envioForm = new EventEmitter<any>();

  formPrendario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', [Validators.required,]],
    codPostal: ['', [Validators.required]],
    ciudad: ['', Validators.required],
    marca: ['', [Validators.required,]],
    anio: ['', [Validators.required]],
    modelo: ['', [Validators.required,]],
    destino: [''],
    devolucion: ['', Validators.required],
    filial: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

  sendData() {
    this.formPrendario.markAllAsTouched();
    console.log(this.formPrendario.valid)
    if (this.formPrendario.valid) {
      this.envioForm.emit(this.formPrendario.value);
      this.enviandoData = true
      this.formPrendario.reset();
    }
  }

  onInputChange(event: any, input: string) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    this.formPrendario.get(input)!.setValue(valor);
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
    if (this.formPrendario.get(campo)!.invalid && (this.formPrendario.get(campo)!.dirty || this.formPrendario.get(campo)!.touched)) {
      return true;
    } else {
      return false;
    }
  }
}
