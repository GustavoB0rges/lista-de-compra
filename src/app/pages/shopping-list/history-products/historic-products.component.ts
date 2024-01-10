import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { Operation } from 'src/app/shared/enums/operation';

@Component({
  selector: 'app-historic-products',
  templateUrl: './historic-products.component.html',
  styleUrls: ['./historic-products.component.scss'],
  standalone: true,
  imports: [HeaderComponent, TableComponent],
})
export class HistoricProductsComponent {
  @Output() close = new EventEmitter();
  @Input() dataSourceHistoric: Array<any> = [];
  @Input() operation = Operation.VIEW;
  dataSourceBase: Array<any> = [];
  displayedColumns: string[] = ['id', 'dt_update', 'name', 'qtd', 'actions'];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSourceHistoric) {
      this.ordenarPorData();
      this.dataSourceBase = this.dataSourceHistoric;
    }
  }

  ordenarPorData() {
    this.dataSourceHistoric = this.dataSourceHistoric.sort((a, b) => {
      const dataA = new Date(a.dateUpdate);
      const dataB = new Date(b.dateUpdate);
      return dataA.getTime() - dataB.getTime();
    });
  }

  onSearchProduct(searchText: any, dataSourceBase: Array<any>): void {
    if (!dataSourceBase.length) {
      return;
    }
    searchText = searchText ? searchText.toString().toLocaleLowerCase() : '';

    this.dataSourceHistoric = dataSourceBase.filter((obj) => {
      const has = Object.values(obj).filter((element) => {
        if (
          element !== null &&
          element.toString().toLocaleLowerCase().indexOf(searchText) > -1
        ) {
          return element;
        }
        return false;
      });
      return has.length ? true : false;
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
