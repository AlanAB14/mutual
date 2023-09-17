import { Component, OnInit } from '@angular/core';
import { NosotrosService } from '../../services/nosotros.service';

@Component({
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit{
  cargandoData: boolean = true
  titulo: string = '';
  texto: string = '';
  video!: string;

  constructor( private nosotrosService: NosotrosService ) { }

  ngOnInit(): void {
    this.nosotrosService.getNosotrosContent()
      .subscribe( (content: any) => {
        this.video = content[0].video
        this.titulo = content[0].titulo;
        this.texto = content[0].texto;
        const videoElement = document.querySelector('video');
        videoElement!.load();
        this.cargandoData = false;
      })
  }

}
