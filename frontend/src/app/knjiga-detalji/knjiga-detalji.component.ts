import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { Komentar } from '../model/komentar';
import { User } from '../model/user';
import { Zaduzene } from '../model/zaduzene';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-knjiga-detalji',
  templateUrl: './knjiga-detalji.component.html',
  styleUrls: ['./knjiga-detalji.component.css']
})
export class KnjigaDetaljiComponent implements OnInit {

  constructor(private knjigaService: KnjigaService, private router:Router, private userService:UserService) { }

  moderator: boolean
  korisnik: boolean
  knjiga: Knjiga
  aut: string
  zan: string
  message:string
  naslov:string
  zanr:string
  pisac:string
  jezik:string
  izdavac:string
  godina:number
  naStanju:number
  tip: string;
  user: User
  zaZaduzenje: boolean
  zaKomentarisanje: boolean
  zaduzene: Zaduzene[]
  glob_dani: number
  komentar: string
  ocena: number
  komentari: Komentar[]
  slika: File
  isMenuCollapsed: boolean

  ngOnInit(): void {
    this.isMenuCollapsed = true;
    this.komentar = ''
    this.knjiga = JSON.parse(sessionStorage.getItem('knjigaZaDetalje'));
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
    this.zaZaduzenje = false;
    if(this.knjiga.broj_na_stanju > 0 && this.user.tip_korisnika == 'korisnik'){
      this.userService.getDays().subscribe ((data: number)=>{
        this.glob_dani = data;
      });
      this.userService.zaduzeneKnjige(this.user.username).subscribe ((istorija: Zaduzene[])=>{
        this.zaduzene = istorija
        let c = false
        for(let tr of istorija)
          if(tr.id_knjige == this.knjiga.id)
            c = true
        if(!c)
          this.zaZaduzenje = true;

        this.userService.sviKomentari(this.knjiga.id).subscribe ((kom: Komentar[])=>{
          this.komentari = kom
          this.komentari.sort((n1,n2) => {
            if (n1.datum > n2.datum) {
                return -1;
            }
        
            if (n1.datum < n2.datum) {
                return 1;
            }
        
            return 0;
          });

          this.zaKomentarisanje = true;
          for(let tr of this.komentari){
            if(tr.username == this.user.username)
              this.zaKomentarisanje = false;
          }

          if(this.zaKomentarisanje)
            this.zaKomentarisanje = !this.zaZaduzenje
        });
      });
    }
    this.aut = this.knjiga.autor.toString();
    this.zan = this.knjiga.zanr.toString();
    if(sessionStorage.getItem('korisnikZaTipKnjige') == '"moderator"')
      this.moderator = true;
    else if(sessionStorage.getItem('korisnikZaTipKnjige') == '"korisnik"')
      this.korisnik = true;
  }

  izmeni(){
    this.knjigaService.izmena(this.naslov, this.zanr, this.pisac, this.jezik, this.izdavac, this.godina, this.naStanju, this.knjiga).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'Book changed'
        if(this.tip == 'admin')
          this.router.navigate(['admin-log']);
        else
          this.router.navigate(['']);
      }
      else{
        this.message = respObj['message']
      }
    });
  }

  obrisi(){
    this.knjigaService.obrisi(this.knjiga.id).subscribe(respObj=>{
      if(respObj['message']=='Knjiga je zaduzena - ne moze se obrisati'){
        this.message = 'Knjiga je zaduzena - ne moze se obrisati'
      }
      else if(respObj['message']=='Knjiga ne postoji'){
        this.message = 'Knjiga ne postoji'
      }
      else{
        this.message = 'Book deleted'
        this.router.navigate(['admin-log']);
      }
    });
  }

  zaduzi(){
    let sme = false;
    if(this.zaduzene.length >= 3){
      sme = true;
      this.message = "Ne mozete za zaduzite knjigu, imate 3 zaduzene knjige"
    }
    for(let tr of this.zaduzene){
      if(this.istekaoRok(tr.datumZaduzenja, Date())){
        sme = true;
        this.message = "Ne mozete za zaduzite knjigu, imate istekao rok za vracanje knjige"
      }
    }
    if(!sme){
      this.knjigaService.zaduzi(this.knjiga.id, this.user.username).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'Knjiga je zaduzena'
          this.zaZaduzenje = false;
          this.knjiga.broj_na_stanju--;
          sessionStorage.setItem('knjigaZaDetalje',JSON.stringify(this.knjiga))
        }else{
          this.message = 'Greska'
        }
      });
    }
  }

  istekaoRok(startDate, endDate) {
    if((startDate - endDate) / (1000 * 60 * 60 * 24) > this.glob_dani){
      return true;
    }
    else{
      return false;
    }
  }

  komentarisi(){
    if(this.ocena > 5 || this.ocena < 0){
      this.message = "Ocena mora da bude izmedju 1 i 5"
    }else if(this.komentar.length > 1000){
      this.message = "Komentar ne sme da bude duzi od 1000 karaktera"
    }else if(this.komentar.length == 0){
      this.message = "Komentar ne sme da bude prazan"
    }else{
      this.userService.komentarisi(this.komentar, this.ocena, this.user.username, this.knjiga.id).subscribe (respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'Komentar je postavljen'
          this.zaKomentarisanje = false
        }else{
          this.message = 'Greska'
        }
      });
    }
  }
}
