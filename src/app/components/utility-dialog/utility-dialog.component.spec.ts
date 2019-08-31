import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityDialogComponent } from './utility-dialog.component';

describe('UtilityDialogComponent', () => {
  let component: UtilityDialogComponent;
  let fixture: ComponentFixture<UtilityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
