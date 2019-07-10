import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalcomponentComponent } from './terminalcomponent.component';

describe('TerminalcomponentComponent', () => {
  let component: TerminalcomponentComponent;
  let fixture: ComponentFixture<TerminalcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
