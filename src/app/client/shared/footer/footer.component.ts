import { Component } from '@angular/core';
import { Filiales } from 'src/app/core/interfaces/filiales.interface';
import { filiales, socialMedia } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  filiales: Filiales[] = filiales;
  socialMedia = socialMedia
}
