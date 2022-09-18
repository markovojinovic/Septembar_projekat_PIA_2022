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
  isMenuCollapsed: boolean
  brojObavestenja: number
  isCollapsed: boolean

  ngOnInit(): void {
    this.isCollapsed = true
    this.brojObavestenja = 6
    this.isMenuCollapsed = true;
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
  }

}
