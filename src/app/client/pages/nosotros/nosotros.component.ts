import { Component, OnInit } from '@angular/core';
import { NosotrosService } from '../../services/nosotros.service';

@Component({
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit{

  titulo!: string;
  texto!: string;

  constructor( private nosotrosService: NosotrosService ) { }

  ngOnInit(): void {
    this.nosotrosService.getNosotrosContent()
      .subscribe( content => {
        this.titulo = content.titulo
        this.texto = content.texto
      })
  }

}
