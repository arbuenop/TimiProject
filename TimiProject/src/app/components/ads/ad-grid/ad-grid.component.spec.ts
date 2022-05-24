import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdGridComponent } from './ad-grid.component';

describe('AdGridComponent', () => {
  let component: AdGridComponent;
  let fixture: ComponentFixture<AdGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
