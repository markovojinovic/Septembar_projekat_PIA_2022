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
  tip: string;
  isMenuCollapsed: boolean
  link: string
  slika: string | ArrayBuffer
  imeSlike: string

  ngOnInit(): void {
    this.isMenuCollapsed = true;
    this.knjiga = JSON.parse(sessionStorage.getItem('knjigaZaIzmeniti'));
    this.tip = JSON.parse(sessionStorage.getItem('tipIzmene'));
    if(this.tip == 'admin')
      this.link = 'admin-log'
    else  
      this.link = ''
    
  }

  izmeni(){
    this.knjigaService.izmena(this.naslov, this.zanr, this.pisac, this.jezik, this.izdavac, this.godina, this.naStanju, this.knjiga, this.slika, this.imeSlike).subscribe(respObj=>{
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

}
