import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitAuthComponent } from './init-auth.component';

describe('InitAuthComponent', () => {
  let component: InitAuthComponent;
  let fixture: ComponentFixture<InitAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
