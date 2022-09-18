import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigaService } from '../services/knjiga.service';

@Component({
  selector: 'app-knjiga-zahtev',
  templateUrl: './knjiga-zahtev.component.html',
  styleUrls: ['./knjiga-zahtev.component.css']
})
export class KnjigaZahtevComponent implements OnInit {

  constructor(private router: Router, private knjigaService: KnjigaService) { }

  message: string;
  naslov:string
  zanr:string
  pisac:string
  jezik:string
  izdavac:string
  godina:number
  naStanju:number
  slika: File
  isMenuCollapsed: boolean

  ngOnInit(): void {
    this.isMenuCollapsed = true;
  }

  addBook(){
    this.knjigaService.zahtev(this.naslov, this.zanr, this.pisac, this.jezik, this.izdavac, this.godina, this.naStanju).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'Book added'
        this.router.navigate['']
      }
      else{
        this.message = respObj['message']
      }
    });
  }

}
