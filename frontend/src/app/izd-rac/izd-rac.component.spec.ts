import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzdRacComponent } from './izd-rac.component';

describe('IzdRacComponent', () => {
  let component: IzdRacComponent;
  let fixture: ComponentFixture<IzdRacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzdRacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzdRacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
