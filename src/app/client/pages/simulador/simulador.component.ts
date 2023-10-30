import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})
export class SimuladorComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: [100000, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['1', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
  ) { }

  goToPrestamo() {
    const data = { url: 'prestamos-prendarios', titulo: 'Préstamos Prendarios', tipoInversion: null };
    console.log(data)
    const url = this.router.serializeUrl(this.router.createUrlTree(['prestamo', { c: btoa(JSON.stringify(data)) }]));
    window.open(`/#/${url}`, '_self');
  }
}
