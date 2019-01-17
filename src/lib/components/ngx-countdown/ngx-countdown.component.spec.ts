import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCountdownComponent } from './ngx-countdown.component';

describe('NgxCountdownComponent', () => {
  let component: NgxCountdownComponent;
  let fixture: ComponentFixture<NgxCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
