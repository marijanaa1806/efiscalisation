import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasStolComponent } from './ras-stol.component';

describe('RasStolComponent', () => {
  let component: RasStolComponent;
  let fixture: ComponentFixture<RasStolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasStolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RasStolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
