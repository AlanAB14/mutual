import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filiales } from 'src/app/core/interfaces/filiales.interface';
import { filiales, montos } from 'src/environments/environment';

@Component({
  selector: 'form-consultorio-juridico',
  templateUrl: './consultorio-juridico.component.html',
  styleUrls: ['./consultorio-juridico.component.scss']
})
export class ConsultorioJuridicoComponent {
  @Input() enviandoData: boolean = false;
  @Output() envioForm = new EventEmitter<any>();

  montos: string[] = montos;
  filiales: Filiales[] = filiales;

  formConsultorioJuridico: FormGroup = this.fb.group({
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
    this.formConsultorioJuridico.markAllAsTouched();
    console.log(this.formConsultorioJuridico.valid)
    if (this.formConsultorioJuridico.valid) {
      console.log(this.formConsultorioJuridico.value)
      this.creaCampoCelular();
      this.envioForm.emit(this.formConsultorioJuridico.value);
      this.enviandoData = true
      this.formConsultorioJuridico.reset();
    }
  }

  onInputChange(event: any, input: string) {
    const valor = event.target.value.replace(/[^0-9]/g, '');
    this.formConsultorioJuridico.get(input)!.setValue(valor);
  }

  creaCampoCelular() {
    this.formConsultorioJuridico.patchValue({
      celular: `${this.formConsultorioJuridico.value.celularArea}-${this.formConsultorioJuridico.value.celularNumero}`
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
    if (this.formConsultorioJuridico.get(campo)!.invalid && (this.formConsultorioJuridico.get(campo)!.dirty || this.formConsultorioJuridico.get(campo)!.touched)) {
      return true;
    } else {
      return false;
    }
  }
}
