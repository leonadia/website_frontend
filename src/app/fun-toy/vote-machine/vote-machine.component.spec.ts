import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteMachineComponent } from './vote-machine.component';

describe('VoteMachineComponent', () => {
  let component: VoteMachineComponent;
  let fixture: ComponentFixture<VoteMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
