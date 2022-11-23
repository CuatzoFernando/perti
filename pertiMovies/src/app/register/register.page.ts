import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { BehaviorSubject, of, merge } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  authState = new BehaviorSubject(false);

  user: any = {};
  constructor(
    public userService: UserService,
    public storage: Storage,
    private router: Router,
    private toastController: ToastController
  ) {
    this.getUsers();
  }

  ngOnInit() {}

  getUsers() {
    const dataUser = this.userService.getUsers().subscribe(async (result) => {
      const data = await result.results[0];
      const title = `${data.name.title}. ${data.name.first} ${data.name.last}`;
      this.user = {
        email: data.email,
        gender: data.gender,
        name: title,
        username: data.login.username,
        password: data.login.password,
      };
      const addStorage = await this.storage.set('USER', this.user);
    });
  }

  async register() {
    this.router.navigate(['login']);
    this.authState.next(true);
    const title = `Se creó un nuevo usuario: ${this.user.username} con Contraseña: ${this.user.password}`;
    const toast = await this.toastController.create({
      message: title,
      duration: 5000,
      position: 'top',
    });

    await toast.present();
  }
}
