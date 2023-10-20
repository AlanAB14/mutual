import { Component, } from '@angular/core';
import { phoneNumber } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'mutual';


  openWhatsapp() {
    const number = phoneNumber.number;
    const message = 'Tengo una consulta desde la web www.mutualentreasoc.com.ar';
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}
