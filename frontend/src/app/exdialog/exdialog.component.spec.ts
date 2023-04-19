import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExdialogComponent } from './exdialog.component';

describe('ExdialogComponent', () => {
  let component: ExdialogComponent;
  let fixture: ComponentFixture<ExdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
