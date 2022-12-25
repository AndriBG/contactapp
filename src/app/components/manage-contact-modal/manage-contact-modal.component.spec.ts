import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContactModalComponent } from './manage-contact-modal.component';

describe('ManageContactModalComponent', () => {
  let component: ManageContactModalComponent;
  let fixture: ComponentFixture<ManageContactModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageContactModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
