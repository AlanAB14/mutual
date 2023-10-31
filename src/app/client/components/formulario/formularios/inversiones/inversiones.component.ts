import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filiales } from 'src/app/core/interfaces/filiales.interface';
import { filiales, montos } from 'src/environments/environment';

@Component({
  selector: 'form-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.scss']
})
export class InversionesComponent {
  @Input() enviandoData: boolean = false;
  @Output() envioForm = new EventEmitter<any>();

  montos: string[] = montos;
  filiales: Filiales[] = filiales;

  formInversiones: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: [''],
    celularArea: ['', [Validators.required,]],
    celularNumero: ['', [Validators.required,]],
    dni: ['', [Validators.required,]],
    codPostal: ['', [Validators.required]],
    ciudad: ['', Validators.required],
    interes: ['', [Validators.required,]],
    filial: ['', Validators.required],
  })

  constructor(private fb: FormBuilder) { }

  sendData() {
    this.formInversiones.markAllAsTouched();
    console.log(this.formInversiones.valid)
    if (this.formInversiones.valid) {
      this.creaCampoCelular();
      console.log(this.formInversiones.value)
      this.envioForm.emit(this.formInversiones.value);
      this.enviandoData = true
      this.formInversiones.reset();
    }
  }

  onInputChange(event: any, input: string) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    this.formInversiones.get(input)!.setValue(valor);
  }

  creaCampoCelular() {
    this.formInversiones.patchValue({
      celular: `${this.formInversiones.value.celularArea}-${this.formInversiones.value.celularNumero}`
    })
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
    if (this.formInversiones.get(campo)!.invalid && (this.formInversiones.get(campo)!.dirty || this.formInversiones.get(campo)!.touched)) {
      return true;
    } else {
      return false;
    }
  }

}
