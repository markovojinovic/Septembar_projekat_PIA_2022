import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniPodatkeComponent } from './izmeni-podatke.component';

describe('IzmeniPodatkeComponent', () => {
  let component: IzmeniPodatkeComponent;
  let fixture: ComponentFixture<IzmeniPodatkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeniPodatkeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniPodatkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
