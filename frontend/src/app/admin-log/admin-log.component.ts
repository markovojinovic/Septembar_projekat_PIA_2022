import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { idText } from 'typescript';
import { User } from '../model/user';
import { Zahtev } from '../model/zahtev';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.css']
})
export class AdminLogComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  username: string;
  password: string;
  c_password: string;
  ime_prezime: string;
  adresa: string;
  telefon: string;
  email: string;
  message: string;
  sviZahtevi: Zahtev[]
  sviKorisnici: User[]

  ngOnInit(): void {
    this.userService.sviZahtevi().subscribe((data: Zahtev[])=>{
      this.sviZahtevi = data;
    })
    this.userService.sviKorisnici().subscribe((data: User[])=>{
      this.sviKorisnici = data;
    })
  }

  register(){
    if(this.password == this.c_password){//ovde dodati i validaciju

      if(this.password.length < 8 || this.password.length > 12)
        this.message = "Lozinka treba da bude izmedju 8 i 12 karaktera"
      else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(this.password))) 
        this.message = 'Niste uneli lozinku po definisanom karakteru';
      else if(!(/^[a-z]/.test(this.password)))
      this.message = 'Prvi karakter nije malo slovo';
      else if (this.telefon.length == 0) 
        this.message = 'Niste uneli broj telefona.';
      else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)))
        this.message = 'Lose formatiran mejl. \t';
       else{

        this.userService.dodavanje(this.username, this.password, this.ime_prezime, this.adresa, this.telefon, this.email, "korisnik").subscribe(respObj=>{
          if(respObj['message']=='ok'){
            this.message = 'User added'
            this.router.navigate(['admin-log']);
          }
          else{
            this.message = respObj['message']
          }
        });

      }
    }else{
      this.message = 'Pogresna potvrda password-a'
    }
    
  }

  odobri(username){
    this.userService.odobri(username).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'User verifyed'
        this.userService.sviZahtevi().subscribe((data: Zahtev[])=>{
          this.sviZahtevi = data;
        })
      }
      else{
        this.message = respObj['message']
      }
    });
  }

  izmeni(korisnik){
    sessionStorage.setItem('korisnikZaIzmeniti', JSON.stringify(korisnik));
    this.router.navigate(['izmeni-korisnika']);
  }

  getItems() {
    return this.sviKorisnici.filter((item) => item.tip_korisnika != "admin");
  }

}
