import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router) { }

  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
  }

  logout(): void{
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
