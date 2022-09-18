import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-izmeni-podatke',
  templateUrl: './izmeni-podatke.component.html',
  styleUrls: ['./izmeni-podatke.component.css']
})
export class IzmeniPodatkeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  username: string;
  ime_prezime: string;
  adresa: string;
  telefon: string;
  email: string;
  message: string;
  user: User;
  slika: File
  isMenuCollapsed: boolean

  ngOnInit(): void {
    this.isMenuCollapsed = true;
    this.user= JSON.parse(sessionStorage.getItem('ulogovan'));
  }

  izmeni(){
    this.userService.izmenaPodataka(this.username, this.ime_prezime, this.adresa, this.telefon, this.email, this.user).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'Data changed'
        this.router.navigate(['profil']);
      }
      else{
        this.message = respObj['message']
      }
    });
  }

}
