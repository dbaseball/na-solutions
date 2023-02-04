import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NalogoComponent } from './nalogo.component';

describe('NalogoComponent', () => {
  let component: NalogoComponent;
  let fixture: ComponentFixture<NalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NalogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
