import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {

  constructor() { }

  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
  }

}
