import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InteresesService } from '../../services/intereses.service';


@Component({
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})


export class SimuladorComponent implements OnInit {
  tna: any = {
    seis: 0,
    doce: 0,
    veinticuatro: 0
  };
  tasaServicio: any;
  importeCuotas: any = {
    seis: 0,
    doce: 0,
    veinticuatro: 0
  };

  firstFormGroup = this._formBuilder.group({
    firstCtrl: [100000, [Validators.required, Validators.min(100000), Validators.max(2000000)]],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['1', Validators.required],
  });

  isLinear = true;
  ocultaInput: boolean = true;
  @ViewChild('myInput') myInput!: ElementRef;

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private interesesService: InteresesService
  ) { }

  ngOnInit(): void {
    this.traerIntereses();
  }

  traerIntereses() {
    this.interesesService.getIntereses()
      .subscribe((intereses: any) => {
        intereses.forEach((interes: any) => {
          if (interes.tipo === '6 cuotas') {
            this.tna.seis = interes.interes
          } else if (interes.tipo === '12 cuotas') {
            this.tna.doce = interes.interes
          } else if (interes.tipo === '24 cuotas') {
            this.tna.veinticuatro = interes.interes
          }
        })
        console.log(this.tna)
      })
  }

  goToPrestamo() {
    const data = { url: 'prestamos-personales', titulo: 'Préstamos Personales', tipoInversion: null };
    console.log(data)
    const url = this.router.serializeUrl(this.router.createUrlTree(['prestamo', { c: btoa(JSON.stringify(data)) }]));
    window.open(`/#/${url}`, '_self');
  }

  calculaCuota() {
    this.tasaServicio = {
      seis: this.firstFormGroup.value.firstCtrl! * ((this.tna.seis / 12) / 100 * 6),
      doce: this.firstFormGroup.value.firstCtrl! * ((this.tna.doce / 12) / 100 * 12),
      veinticuatro: this.firstFormGroup.value.firstCtrl! * ((this.tna.veinticuatro / 12) / 100 * 24),
    }

    this.importeCuotas = {
      seis: Math.round((this.firstFormGroup.value.firstCtrl! + this.tasaServicio.seis) / 6),
      doce: Math.round((this.firstFormGroup.value.firstCtrl! + this.tasaServicio.doce) / 12),
      veinticuatro: Math.round((this.firstFormGroup.value.firstCtrl! + this.tasaServicio.veinticuatro) / 24)
    }

  }

  validateCampo() {
    const number = Number(this.firstFormGroup.value.firstCtrl)
    console.log(number)
    if (this.firstFormGroup.value.firstCtrl! > 2000000) {
      this.firstFormGroup.controls.firstCtrl.patchValue(2000000)
    } else if (this.firstFormGroup.value.firstCtrl! < 100000) {
      this.firstFormGroup.controls.firstCtrl.patchValue(100000)
    } else {
      this.firstFormGroup.controls.firstCtrl.patchValue(this.roundToNearest100000(this.firstFormGroup.value.firstCtrl!))
    }
    this.ocultaInput = true;
  }

  roundToNearest100000(num: number) {
    return Math.round(num / 100000) * 100000;
  }

  selectInputContent() {
    this.ocultaInput = false;
    setTimeout(() => {
      this.firstFormGroup.controls.firstCtrl.patchValue(0)
      this.myInput.nativeElement.focus();
    });
  }

}
