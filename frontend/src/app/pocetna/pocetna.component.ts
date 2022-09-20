import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { KnjigaZahtev } from '../model/knjiga_zahtev';
import { Obavestenja } from '../model/obavestenja';
import { User } from '../model/user';
import { Zaduzene } from '../model/zaduzene';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private router:Router, private knjigaService: KnjigaService, private userService: UserService) { }

  user: User;
  allBooks: Knjiga[];
  top3: Knjiga[];
  top3stanje: Boolean[];
  searchText: string;
  searched: Boolean
  knjigaDana: Knjiga
  message:string
  naslov:string
  zanr:string
  pisac:string
  Zanr: Array<string>
  Pisac: Array<string>
  jezik:string
  izdavac:string
  godina:number
  naStanju:number
  moderator: boolean
  isMenuCollapsed:boolean
  sviZahtevi: KnjigaZahtev[]
  brojObavestenja: number
  isCollapsed: boolean
  slika: string | ArrayBuffer
  imeSlike: string
  globDani: number
  seen: boolean

  ngOnInit(): void {
    this.isCollapsed = true;
    this.searched = false
    this.isMenuCollapsed = true;
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
    if(this.user != null){
      if(this.user.tip_korisnika == 'moderator'){
        this.moderator = true;
        this.knjigaService.sviZahtevi().subscribe((data: KnjigaZahtev[])=>{
          this.sviZahtevi = data
      })
      }
      this.userService.getDays().subscribe ((data: number)=>{
        this.globDani = data;
        this.user.crvena = new Array
        this.user.zelena = new Array
        this.user.siva = new Array
        this.user.plava = new Array
        this.user.akva = new Array

        this.userService.svaObavestenja(this.user.username).subscribe((data: Obavestenja[])=>{
          for(let tr of data){
            if(tr.nivo == "zelena"){
              this.user.zelena.push(tr.tekst)
            }
            else if(tr.nivo == "crvena"){
              this.user.crvena.push(tr.tekst)
            }
          }
          this.userService.zaduzeneKnjige(this.user.username).subscribe ((istorija: Zaduzene[])=>{
            this.knjigaService.getAllBooks().subscribe ((data: Knjiga[])=>{
              for(let tr of data){
                for(let tr1 of istorija){
                  if(tr.id == tr1.id_knjige){
                    if(this.getDiffDays(new Date(),new Date(tr1.datumZaduzenja)) <= 2 && this.getDiffDays(new Date(),new Date(tr1.datumZaduzenja)) > 0){
                      let naslov = "Knjizi "
                      naslov += tr.naziv
                      naslov += " koju ste iznajmili za manje od 2 dana istice rok za vracanje"
                      this.user.akva.push(naslov)
                    }else if(this.getDiffDays(new Date(),new Date(tr1.datumZaduzenja)) < 0){
                      let naslov = "Knjizi "
                      naslov += tr.naziv
                      naslov += " koju ste iznajmili je istekao rok za vracanje"
                      this.user.plava.push(naslov)
                    }
                  }
                }
              }
              if(istorija.length >= 3){
                this.user.siva.push("Imate tri knjige na zaduzenju")
              }
              this.seen = false
              this.brojObavestenja = this.user.crvena.length + this.user.zelena.length + this.user.siva.length + this.user.plava.length + this.user.akva.length
            });
          });
        })
    });
    }
    else  
      this.moderator = false;
    
      this.knjigaService.getAllBooks().subscribe((data: Knjiga[])=>{
        if(data != null){
          this.allBooks = data;
          this.allBooks.sort((n1,n2) => {
            if (n1.uzimana < n2.uzimana) {
                return 1;
            }
        
            if (n1.uzimana > n2.uzimana) {
                return -1;
            }
        
            return 0;
          });
          this.top3 = new Array(this.allBooks[0], this.allBooks[1], this.allBooks[2])
          this.top3[0].slika_korice = 'prva.jpg'
          this.top3[1].slika_korice = 'druga.jpg'
          this.top3[2].slika_korice = 'treca.jpg'
          this.top3stanje = new Array(true, false, false);

          if(this.user != null){
            if(this.knjigaDana == null){
              let max = this.allBooks.length - 1 
              this.knjigaDana = this.allBooks[Math.floor(Math.random() * (max))]
              sessionStorage.setItem('knjigaDana', JSON.stringify(this.knjigaDana));
            }
          }
        }
      })
      
  }

  getDiffDays(startDate, endDate) {
    return this.globDani - Math.ceil(Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24));
  } 

  logOut(): void{
    sessionStorage.clear();
    this.user = null
    this.router.navigate(['']);
  }

  basicSearch(){
    this.searched = true
  }

  clearSearch(){
    this.searchText = ""
    this.searched = false
  }

  rightClick(){
    let i = this.top3stanje.indexOf(true);
    this.top3stanje[i] = false;
    this.top3stanje[(i + 1) % 3] = true;
  }

  leftClick(){
    let i = this.top3stanje.indexOf(true);
    this.top3stanje[i] = false;
    i--;
    if(i < 0) i = 2;
    this.top3stanje[i] = true;
  }

  detaljiKnjige(knjiga){
    sessionStorage.setItem('knjigaZaDetalje', JSON.stringify(knjiga));
    sessionStorage.setItem('korisnikZaTipKnjige', JSON.stringify(this.user.tip_korisnika));
    this.router.navigate(['knjiga-detalji']);
  }

  izmeni_knjigu(knjiga){
    sessionStorage.setItem('knjigaZaIzmeniti', JSON.stringify(knjiga));
    sessionStorage.setItem('tipIzmene', JSON.stringify("moderator"));
    this.router.navigate(['izmeni-knjigu']);
  }

  addBook(){
    if(this.naslov != null && this.zanr != null && this.pisac != null && this.jezik != null && this.izdavac != null && this.godina != null && this.naStanju != null){
      this.Zanr = this.zanr.split(',');
      this.Pisac = this.pisac.split(',');
      this.knjigaService.addBook(this.naslov, this.Zanr, this.Pisac, this.jezik, this.izdavac, this.godina, this.naStanju, this.slika, this.imeSlike).subscribe(respObj=>{
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

  odobri(knjiga){
    this.knjigaService.odobri(knjiga).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'Knjiga odobrena'
      }
      else{
        this.message = respObj['message']
      }
    });
  }

  odbi(knjiga){
    this.knjigaService.odbi(knjiga).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'Knjiga odbijena'
      }
      else{
        this.message = respObj['message']
      }
    });
  }

  obrisiSivu(ind){
      this.user.siva.splice(ind);
      this.brojObavestenja--;
  }

  obrisiPlavu(ind){
    this.user.plava.splice(ind);
    this.brojObavestenja--;
  }

  obrisiAkva(ind){
    this.user.akva.splice(ind);
    this.brojObavestenja--;
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

  obav(){
    this.isCollapsed = !this.isCollapsed
    if(!this.seen)
      this.seen = true;
  }
}