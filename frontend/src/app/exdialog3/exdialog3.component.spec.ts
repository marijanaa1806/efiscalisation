import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exdialog3Component } from './exdialog3.component';

describe('Exdialog3Component', () => {
  let component: Exdialog3Component;
  let fixture: ComponentFixture<Exdialog3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Exdialog3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Exdialog3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
