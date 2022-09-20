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
  isMenuCollapsed: boolean
  slika: string | ArrayBuffer
  imeSlike: string

  ngOnInit(): void {
    this.isMenuCollapsed = true;
    this.user = JSON.parse(sessionStorage.getItem('korisnikZaIzmeniti'));
  }

  izmeni(){
        this.userService.izmena(this.username, this.password, this.ime_prezime, this.adresa, this.telefon, this.email, this.user.tip_korisnika, this.user, this.slika, this.imeSlike).subscribe(respObj=>{
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

  zabrani(){
    this.userService.zabrani(this.user.username).subscribe(respObj=>{
      this.message = 'Korisnik zabranjen'
      this.router.navigate(['admin-log']);
  });
  }

  odblokiraj(){
    this.userService.odblokiraj(this.user.username).subscribe(respObj=>{
      this.message = 'Korisnik je odblokiran'
      this.router.navigate(['admin-log']);
  });
  }

  onChange(event) {
    this.imeSlike = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (evt) => {
      this.slika = evt.target.result;
    };
    let regex = /^.*\.(png|jpg|JPG)$/;
    if(!regex.test(this.imeSlike)){
      this.message = "Pogresan format fajla!"
      this.slika = null;
      this.imeSlike= "";
    }
  }

}
