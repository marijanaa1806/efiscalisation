import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exdialog2Component } from './exdialog2.component';

describe('Exdialog2Component', () => {
  let component: Exdialog2Component;
  let fixture: ComponentFixture<Exdialog2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Exdialog2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Exdialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
