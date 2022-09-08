import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniKnjiguComponent } from './izmeni-knjigu.component';

describe('IzmeniKnjiguComponent', () => {
  let component: IzmeniKnjiguComponent;
  let fixture: ComponentFixture<IzmeniKnjiguComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeniKnjiguComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniKnjiguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
