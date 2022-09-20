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
  slikaUser: string | ArrayBuffer
  slikaBook: string | ArrayBuffer
  imeSlikeUser: string
  imeSlikeBook: string
  Pisac: Array<string>
  Zanr: Array<string>

  ngOnInit(): void {
    let user  = JSON.parse(sessionStorage.getItem('ulogovan'));
    if(user.tip_korisnika != "admin"){
      this.router.navigate['']
    }
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
            if(this.password == this.c_password){

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
              else if(this.username.length == 0){
                this.message = 'Username ne sme da bude prazan'
              }
              else if(this.ime_prezime.length == 0){
                this.message = 'Ime i prezime ne sme da bude prazno'
              }
              else if(this.adresa.length == 0){
                this.message = 'Adresa ne sme da bude prazna'
              }else if(this.telefon.length == 0){
                this.message = 'Telefon ne sme da bude prazan'
              }
              else if(this.email.length == 0){
                this.message = 'Email ne sme da bude prazan'
              }
               else{
                this.imeSlikeUser += '_'
                this.imeSlikeUser += this.username
                this.userService.dodavanje(this.username, this.password, this.ime_prezime, this.adresa, this.telefon, this.email, "korisnik", this.slikaUser, this.imeSlikeUser).subscribe(respObj=>{
                  if(respObj['message']=='ok'){
                    this.message = 'User added'
                    this.router.navigate(['']);
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
    if(this.naslov != null && this.zanr != null && this.pisac != null && this.jezik != null && this.izdavac != null && this.godina != null && this.naStanju != null){
      this.Zanr = this.zanr.split(',');
      this.Pisac = this.pisac.split(',');
      this.knjigaService.addBook(this.naslov, this.Zanr, this.Pisac, this.jezik, this.izdavac, this.godina, this.naStanju, this.slikaBook, this.imeSlikeBook).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'Book added'
        }
        else{
          this.message = respObj['message']
        }
      });
    }
    else  
      this.message = "Pole/a ne moze biti prazno"
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

  onChangeBook(event) {
    this.imeSlikeBook = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (evt) => {
      this.slikaBook = evt.target.result;
    };
    let regex = /^.*\.(png|jpg|JPG)$/;
    if(!regex.test(this.imeSlikeBook)){
      this.message = "Pogresan format fajla!"
      this.slikaBook = null;
      this.imeSlikeBook= "";
    }
  }

  onChangeUser(event) {
    this.imeSlikeUser = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (evt) => {
      this.slikaUser = evt.target.result;
    };
    let regex = /^.*\.(png|jpg|JPG)$/;
    if(!regex.test(this.imeSlikeUser)){
      this.message = "Pogresan format fajla!"
      this.slikaUser = null;
      this.imeSlikeUser= "";
      }
    }
}
