import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss']
})
export class PrestamoComponent implements OnInit{
  tipo!: string;
  titulo!: string;
  constructor( private route: ActivatedRoute ) { }
  ngOnInit(): void {
    const data = atob(this.route.snapshot.paramMap.get('c')!)
    let dataJson = JSON.parse(data)
    console.log(dataJson)
    this.tipo = dataJson.url
    this.titulo = dataJson.titulo
  }
}
