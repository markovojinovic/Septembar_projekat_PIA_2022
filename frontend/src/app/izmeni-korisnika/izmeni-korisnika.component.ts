import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-izmeni-korisnika',
  templateUrl: './izmeni-korisnika.component.html',
  styleUrls: ['./izmeni-korisnika.component.css']
})
export class IzmeniKorisnikaComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  username: string;
  password: string;
  c_password: string;
  ime_prezime: string;
  adresa: string;
  telefon: string;
  email: string;
  message: string;
  user: User;
  slika: File

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('korisnikZaIzmeniti'));
  }

  izmeni(){

        this.userService.izmena(this.username, this.password, this.ime_prezime, this.adresa, this.telefon, this.email, this.user.tip_korisnika, this.user).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            this.message = 'User changed'
            this.router.navigate(['admin-log']);
          }
          else{
            this.message = respObj['message']
          }
        });
  }

  obrisi(){
    this.userService.obrisi(this.user.username).subscribe(respObj=>{
      if(respObj['message']=='Korisnik ima zaduzene knjige - ne moze se obrisati'){
        this.message = 'Korisnik ima zaduzene knjige - ne moze se obrisati'
      }
      else{
        this.message = 'User deleted'
        this.router.navigate(['admin-log']);
      }
    });
  }

  promeni(){
    this.userService.promeni(this.user.username).subscribe(respObj=>{
        this.message = 'User role changed'
        this.router.navigate(['admin-log']);
    });
  }

}
