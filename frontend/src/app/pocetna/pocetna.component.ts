import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { KnjigaService } from '../services/knjiga.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private router:Router, private knjigaService: KnjigaService) { }

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
  jezik:string
  izdavac:string
  godina:number
  naStanju:number
  moderator: boolean

  ngOnInit(): void {
    this.searched = false
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
    if(this.user != null)
      if(this.user.tip_korisnika == 'moderator')
        this.moderator = true;
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
          this.top3stanje = new Array(true, false, false);

          if(this.user != null){
            this.knjigaDana = JSON.parse(sessionStorage.getItem('knjigaDana'));
            if(this.knjigaDana == null){
              let max = this.allBooks.length - 1 
              this.knjigaDana = this.allBooks[Math.floor(Math.random() * (max))]
              sessionStorage.setItem('knjigaDana', JSON.stringify(this.knjigaDana));
            }
          }
        }
      })
      
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
    this.knjigaService.addBook(this.naslov, this.zanr, this.pisac, this.jezik, this.izdavac, this.godina, this.naStanju).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'Book added'
      }
      else{
        this.message = respObj['message']
      }
    });
  }
}
