import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.getLoggedInUser());
    this.user = this.authService.getLoggedInUser().sub;
  }

  logout() {
    this.authService.logout();
  }
}
