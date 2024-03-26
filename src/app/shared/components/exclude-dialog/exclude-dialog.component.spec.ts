import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcludeDialogComponent } from './exclude-dialog.component';

describe('ExcludeDialogComponent', () => {
  let component: ExcludeDialogComponent;
  let fixture: ComponentFixture<ExcludeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcludeDialogComponent],
    });
    fixture = TestBed.createComponent(ExcludeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
