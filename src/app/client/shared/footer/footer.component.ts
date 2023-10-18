import { Component } from '@angular/core';
import { filiales, socialMedia } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  filiales: string[] = filiales;
  socialMedia = socialMedia
}
