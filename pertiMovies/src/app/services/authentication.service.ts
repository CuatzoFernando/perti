import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    public userService: UserService
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
    this.storage.create();
  }

  ifLoggedIn() {
    this.storage.get('USER').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  async login() {
    const value = await this.storage.get('USER');
    if (value) {
      this.router.navigate(['home']);
      this.authState.next(true);
    } else {
      this.authState.next(false);
    }
  }

  logout() {
    this.storage.remove('USER').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
