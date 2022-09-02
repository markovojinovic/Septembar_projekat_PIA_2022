import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private router:Router) { }

  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
  }

  logOut(): void{
    sessionStorage.clear();
    this.user = null
    this.router.navigate(['']);
  }
}
