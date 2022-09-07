import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniKorisnikaComponent } from './izmeni-korisnika.component';

describe('IzmeniKorisnikaComponent', () => {
  let component: IzmeniKorisnikaComponent;
  let fixture: ComponentFixture<IzmeniKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeniKorisnikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
