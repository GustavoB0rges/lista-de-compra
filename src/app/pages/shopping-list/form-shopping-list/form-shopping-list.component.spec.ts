import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormShoppingListComponent } from './form-shopping-list.component';

describe('FormShoppingListComponent', () => {
  let component: FormShoppingListComponent;
  let fixture: ComponentFixture<FormShoppingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormShoppingListComponent]
    });
    fixture = TestBed.createComponent(FormShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
