import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { Zaduzene } from '../model/zaduzene';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-zaduzene-knjige',
  templateUrl: './zaduzene-knjige.component.html',
  styleUrls: ['./zaduzene-knjige.component.css']
})
export class ZaduzeneKnjigeComponent implements OnInit {

  constructor(private userService: UserService, private knjigaService: KnjigaService, private router: Router) { }

  user: User
  knjige: Knjiga[]
  dani: Number[]
  poruke: String[]
  glob_dani: number
  message: string
  isMenuCollapsed: boolean

  ngOnInit(): void {
    this.isMenuCollapsed = true
    this.knjige = new Array;
    this.dani = new Array;
    this.poruke = new Array
    this.user= JSON.parse(sessionStorage.getItem('ulogovan'));
    this.userService.getDays().subscribe ((data: number)=>{
      this.glob_dani = data;
      console.log(this.glob_dani)
      this.userService.zaduzeneKnjige(this.user.username).subscribe ((istorija: Zaduzene[])=>{
        this.knjigaService.getAllBooks().subscribe ((data: Knjiga[])=>{
          for(let tr of data){
            for(let tr1 of istorija){
              if(tr.id == tr1.id_knjige){
                this.knjige.push(tr);
                this.dani.push(this.getDiffDays(new Date(),new Date(tr1.datumZaduzenja)))
              }
            }
          }
        });
      });
    });
  }

  getDiffDays(startDate, endDate) {
    if((startDate - endDate) / (1000 * 60 * 60 * 24) > this.glob_dani){
      this.poruke.push("Istekao rok pre: ")
      return Math.ceil(Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24)) - this.glob_dani;
    }
    else{
      this.poruke.push("Ostalo dana: ")
      return this.glob_dani - Math.ceil(Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24));
    }
  }

  detalji(knjiga){
    sessionStorage.setItem('knjigaZaDetalje', JSON.stringify(knjiga));
    sessionStorage.setItem('korisnikZaTipKnjige', JSON.stringify(this.user.tip_korisnika));
    this.router.navigate(['knjiga-detalji']);
  }

  vrati(id){
    this.knjigaService.vrati(id, this.user.username).subscribe ((respObj)=>{
      if(respObj['message']=='ok'){
        this.router.navigate(['zaduzene-knjige']);
      }
      else{
        this.message = respObj['message']
      }
    });
  }

}
