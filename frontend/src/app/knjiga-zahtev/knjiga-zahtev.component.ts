import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
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
  isMenuCollapsed: boolean
  slika: string | ArrayBuffer
  imeSlike: string
  user: User

  ngOnInit(): void {
    this.isMenuCollapsed = true;
    this.user= JSON.parse(sessionStorage.getItem('ulogovan'));
  }

  addBook(){
    this.knjigaService.zahtev(this.naslov, this.zanr, this.pisac, this.jezik, this.izdavac, this.godina, this.naStanju, this.slika, this.imeSlike, this.user.username).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.message = 'Book added'
        this.router.navigate['']
      }
      else{
        this.message = respObj['message']
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
