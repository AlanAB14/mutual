import { ViewportScroller } from '@angular/common';
import { Component, } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { phoneNumber } from 'src/environments/environment';

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


  openWhatsapp() {
    const number = phoneNumber.number;
    const message = 'Tengo una consulta desde la web www.mutualentreasoc.com.ar';
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}
