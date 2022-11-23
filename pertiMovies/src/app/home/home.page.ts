import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  movies: any = {};
  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.listMovies();
  }

  ngOnInit() {}

  logoutUser() {
    this.authService.logout();
  }

  listMovies() {
    const returnMovies = this.userService.getMovies().subscribe((res) => {
      this.movies = res;
    });
  }
}
