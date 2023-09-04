import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class ClientLayoutComponent implements OnInit{

  constructor( private router: Router ) { }

  ngOnInit(): void {
    this.checkIfHomePage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkIfHomePage();
      }
    });
  }

  checkIfHomePage() {
    const currentRoute = this.router.url;
    if (currentRoute === '/') {
      const ellipseElement = document.querySelector('.ellipse-selector') as HTMLElement;
      if (ellipseElement) {
        ellipseElement.classList.remove('ellipse');
        ellipseElement.classList.add('home-page-ellipse');
      }
    }else {
      const ellipseElement = document.querySelector('.ellipse-selector') as HTMLElement;
      if (ellipseElement) {
        ellipseElement.classList.remove('home-page-ellipse');
        ellipseElement.classList.add('ellipse');
      }
    }
  }

}
