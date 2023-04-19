import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmlogComponent } from './admlog.component';

describe('AdmlogComponent', () => {
  let component: AdmlogComponent;
  let fixture: ComponentFixture<AdmlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
