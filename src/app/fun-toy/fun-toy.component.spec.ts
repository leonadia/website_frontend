import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunToyComponent } from './fun-toy.component';

describe('FunToyComponent', () => {
  let component: FunToyComponent;
  let fixture: ComponentFixture<FunToyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunToyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunToyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
