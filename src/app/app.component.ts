import { ViewportScroller } from '@angular/common';
import { Component, } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Restaurar la posición de desplazamiento al principio de la página
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  title = 'mutual';

}
