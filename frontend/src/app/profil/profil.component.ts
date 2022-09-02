import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor() { }

  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
  }

}