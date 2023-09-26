import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  logOut(){
    // this._authService.logout();
  }

  getUser() {
    // return this._authService.getUser();
  }

}
