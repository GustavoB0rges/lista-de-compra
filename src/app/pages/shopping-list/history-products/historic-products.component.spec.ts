import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricProductsComponent } from './historic-products.component';

describe('HistoricProductsComponent', () => {
  let component: HistoricProductsComponent;
  let fixture: ComponentFixture<HistoricProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricProductsComponent],
    });
    fixture = TestBed.createComponent(HistoricProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
