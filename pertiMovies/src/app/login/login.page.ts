import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private toastController: ToastController,
    private storage: Storage
  ) {}

  ngOnInit() {}

  async loginUser() {
    const valueStatus = await this.authService.login();
  }
}
