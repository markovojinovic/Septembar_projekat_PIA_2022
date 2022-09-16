import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { idText } from 'typescript';
import { Globalni } from '../model/globalni';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { Zahtev } from '../model/zahtev';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.css']
})
export class AdminLogComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private knjigaService: KnjigaService) { }

  username: string;
  password: string;
  c_password: string;
  ime_prezime: string;
  adresa: string;
  telefon: string;
  email: string;
  message: string;
  messageBook: string;
  messageKorisnik: string;
  messageVerify: string;
  sviZahtevi: Zahtev[]
  sviKorisnici: User[]
  sveKnjige: Knjiga[]
  naslov:string
  zanr:string
  pisac:string
  jezik:string
  izdavac:string
  godina:number
  naStanju:number
  days:number;
  daysB:number;
  slikaKnjiga: File
  slikaProfila: File

  ngOnInit(): void {
    this.userService.sviZahtevi().subscribe((data: Zahtev[])=>{
      this.sviZahtevi = data;
    })
    this.userService.sviKorisnici().subscribe((data: User[])=>{
      this.sviKorisnici = data;
    })
    this.userService.getDays().subscribe((data: Globalni)=>{
      this.daysB = data.danaZaduzenja;
    })
    this.knjigaService.getAllBooks().subscribe((data: Knjiga[])=>{
      this.sveKnjige = data;
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
            this.messageKorisnik = 'User added'
            this.router.navigate(['admin-log']);
          }
          else{
            this.messageKorisnik = respObj['message']
          }
        });

      }
    }else{
      this.messageKorisnik = 'Pogresna potvrda password-a'
    }
    
  }

  odobri(username){
    this.userService.odobri(username).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.messageVerify = 'User verifyed'
        this.userService.sviZahtevi().subscribe((data: Zahtev[])=>{
          this.sviZahtevi = data;
        })
      }
      else{
        this.messageVerify = respObj['message']
      }
    });
  }

  izmeni(korisnik){
    sessionStorage.setItem('korisnikZaIzmeniti', JSON.stringify(korisnik));
    this.router.navigate(['izmeni-korisnika']);
  }

  izmeni_knjigu(knjiga){
    sessionStorage.setItem('knjigaZaIzmeniti', JSON.stringify(knjiga));
    sessionStorage.setItem('tipIzmene', JSON.stringify("admin"));
    this.router.navigate(['izmeni-knjigu']);
  }

  addBook(){
    this.knjigaService.addBook(this.naslov, this.zanr, this.pisac, this.jezik, this.izdavac, this.godina, this.naStanju).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.messageBook = 'Book added'
      }
      else{
        this.messageBook = respObj['message']
      }
    });
  }

  getItems() {
    return this.sviKorisnici.filter((item) => item.tip_korisnika != "admin");
  }

  changeDays(){
    if(this.days < 0 || this.days > 365)
      this.message = "Uneseni broj je van opsega"
    else{
      this.userService.changeDays(this.days).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'Days changed'
        }
        else{
          this.message = respObj['message']
        }
      });
    }
  }
}
