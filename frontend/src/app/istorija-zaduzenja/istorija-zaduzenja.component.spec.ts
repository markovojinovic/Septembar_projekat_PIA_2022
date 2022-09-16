import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstorijaZaduzenjaComponent } from './istorija-zaduzenja.component';

describe('IstorijaZaduzenjaComponent', () => {
  let component: IstorijaZaduzenjaComponent;
  let fixture: ComponentFixture<IstorijaZaduzenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstorijaZaduzenjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IstorijaZaduzenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
