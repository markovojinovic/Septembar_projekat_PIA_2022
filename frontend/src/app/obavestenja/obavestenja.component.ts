import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  user: User
  isMenuCollapsed: boolean

  ngOnInit(): void {
    this.isMenuCollapsed = true;
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
  }

}
