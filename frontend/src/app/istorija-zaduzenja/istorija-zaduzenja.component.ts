import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Istorija } from '../model/istorija';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-istorija-zaduzenja',
  templateUrl: './istorija-zaduzenja.component.html',
  styleUrls: ['./istorija-zaduzenja.component.css']
})
export class IstorijaZaduzenjaComponent implements OnInit {

  constructor(private userService: UserService, private knjigaService: KnjigaService, private router: Router) { }

  user: User
  message: string
  istorija: Istorija[]
  sveKnjige: Knjiga[]
  isMenuCollapsed: boolean

  ngOnInit(): void {
    this.isMenuCollapsed = true;
    this.istorija = new Array;
    this.user= JSON.parse(sessionStorage.getItem('ulogovan'));
    this.userService.istorijaZaduzenih(this.user.username).subscribe ((isto: Istorija[])=>{
      this.knjigaService.getAllBooks().subscribe ((data: Knjiga[])=>{
        this.sveKnjige = data
        for(let tr of data){
          for(let tr1 of isto){
            if(tr.id == tr1.id_knjige){
              tr1.datumVracanja = new Date(tr1.datumVracanja)
              tr1.datumZaduzenja = new Date(tr1.datumZaduzenja)
              tr1.autor = tr.autor;
              tr1.naslov = tr.naziv;
              this.istorija.push(tr1);
            }
          }
        }
        this.istorija.sort((n1,n2) => {
          if (n1.datumVracanja > n2.datumVracanja) {
              return -1;
          }
      
          if (n1.datumVracanja < n2.datumVracanja) {
              return 1;
          }
      
          return 0;
        });
      });
    });
  }

  detalji(knjiga){
    let pos;
    for(let tr of this.sveKnjige){
      if(knjiga.id_knjige == tr.id)
        pos = tr;
    }
    sessionStorage.setItem('knjigaZaDetalje', JSON.stringify(pos));
    sessionStorage.setItem('korisnikZaTipKnjige', JSON.stringify(this.user.tip_korisnika));
    this.router.navigate(['knjiga-detalji']);
  }

  sortirajPoNaslovu(){
    this.istorija.sort((n1,n2) => {
      if (n1.naslov > n2.naslov) {
          return -1;
      }
  
      if (n1.naslov < n2.naslov) {
          return 1;
      }
  
      return 0;
    });
  }

  sortirajPoAutoru(){
    this.istorija.sort((n1,n2) => {
      if (n1.autor[0] > n2.autor[0]) {
          return -1;
      }
  
      if (n1.autor[0] < n2.autor[0]) {
          return 1;
      }
  
      return 0;
    });
  }

  sortirajPoDatumuZaduzivanja(){
    this.istorija.sort((n1,n2) => {
      if (n1.datumZaduzenja > n2.datumZaduzenja) {
          return -1;
      }
  
      if (n1.datumZaduzenja < n2.datumZaduzenja) {
          return 1;
      }
  
      return 0;
    });
  }

  sortirajPoDatumuVracanja(){
    this.istorija.sort((n1,n2) => {
      if (n1.datumVracanja > n2.datumVracanja) {
          return -1;
      }
  
      if (n1.datumVracanja < n2.datumVracanja) {
          return 1;
      }
  
      return 0;
    });
  }

}
