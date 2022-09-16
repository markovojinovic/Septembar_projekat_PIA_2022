import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaduzeneKnjigeComponent } from './zaduzene-knjige.component';

describe('ZaduzeneKnjigeComponent', () => {
  let component: ZaduzeneKnjigeComponent;
  let fixture: ComponentFixture<ZaduzeneKnjigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaduzeneKnjigeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaduzeneKnjigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
