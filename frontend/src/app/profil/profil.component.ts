import { Component, OnInit } from '@angular/core';
import { Istorija } from '../model/istorija';
import { Knjiga } from '../model/knjiga';
import { Obavestenja } from '../model/obavestenja';
import { User } from '../model/user';
import { Zaduzene } from '../model/zaduzene';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private userService: UserService, private knjigaService: KnjigaService) { }

  user: User;
  isMenuCollapsed: boolean
  brojObavestenja: number
  isCollapsed: boolean
  globDani: number
  seen: boolean
  

  ngOnInit(): void {
    
    this.isCollapsed = true
    this.isMenuCollapsed = true;
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
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
        this.userService.istorijaZaduzenih(this.user.username).subscribe ((isto: Istorija[])=>{
          this.knjigaService.getAllBooks().subscribe ((data: Knjiga[])=>{
            for(let tr of data){
              for(let tr1 of isto){
                if(tr.id == tr1.id_knjige){
                  tr1.datumVracanja = new Date(tr1.datumVracanja)
                  tr1.datumZaduzenja = new Date(tr1.datumZaduzenja)
                  tr1.autor = tr.autor;
                  tr1.naslov = tr.naziv;
                }
              }
            }
          });
        });
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
            this.seen = false;
            this.brojObavestenja = this.user.crvena.length + this.user.zelena.length + this.user.siva.length + this.user.plava.length + this.user.akva.length
          });
        });
      })
  });
  }

  getDiffDays(startDate, endDate) {
    return this.globDani - Math.ceil(Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24));
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

  obav(){
    this.isCollapsed = !this.isCollapsed
    if(!this.seen)
      this.seen = true;
  }

}
