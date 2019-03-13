import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonShareMenuComponent } from './button-share-menu.component';

describe('ButtonShareMenuComponent', () => {
  let component: ButtonShareMenuComponent;
  let fixture: ComponentFixture<ButtonShareMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonShareMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonShareMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
