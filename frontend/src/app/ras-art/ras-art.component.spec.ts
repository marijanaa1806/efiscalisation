import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasArtComponent } from './ras-art.component';

describe('RasArtComponent', () => {
  let component: RasArtComponent;
  let fixture: ComponentFixture<RasArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasArtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RasArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
