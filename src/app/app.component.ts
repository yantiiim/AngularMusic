import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {

  constructor(public authService: AuthService){

  }
  title = 'MusicAngular';

  onLogout(){
    this.authService.logout();
  }
}
