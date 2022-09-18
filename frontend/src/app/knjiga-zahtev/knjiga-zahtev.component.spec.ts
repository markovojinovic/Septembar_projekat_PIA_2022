import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjigaZahtevComponent } from './knjiga-zahtev.component';

describe('KnjigaZahtevComponent', () => {
  let component: KnjigaZahtevComponent;
  let fixture: ComponentFixture<KnjigaZahtevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnjigaZahtevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnjigaZahtevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
