import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { KnjigaService } from '../services/knjiga.service';

@Component({
  selector: 'app-izmeni-knjigu',
  templateUrl: './izmeni-knjigu.component.html',
  styleUrls: ['./izmeni-knjigu.component.css']
})
export class IzmeniKnjiguComponent implements OnInit {

  constructor(private knjigaService: KnjigaService, private router: Router) { }

  naslov:string
  zanr:string
  pisac:string
  jezik:string
  izdavac:string
  godina:number
  naStanju:number
  message: string
  knjiga: Knjiga

  ngOnInit(): void {
    this.knjiga = JSON.parse(sessionStorage.getItem('knjigaZaIzmeniti'));
  }

  izmeni(){
    this.knjigaService.izmena(this.naslov, this.zanr, this.pisac, this.jezik, this.izdavac, this.godina, this.naStanju, this.knjiga).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'Book changed'
        this.router.navigate(['admin-log']);
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

}
