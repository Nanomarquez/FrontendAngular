import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoDeleteComponent } from './dialogo-delete.component';

describe('DialogoDeleteComponent', () => {
  let component: DialogoDeleteComponent;
  let fixture: ComponentFixture<DialogoDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoDeleteComponent]
    });
    fixture = TestBed.createComponent(DialogoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
