import { AUTO_STYLE } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ReaderTxtService } from 'src/app/reader-txt.service';
import { DrawerComponent } from 'src/app/shared/components/drawer/drawer.component';
import { ExcludeDialogComponent } from 'src/app/shared/components/exclude-dialog/exclude-dialog.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { Operation } from 'src/app/shared/enums/operation';
import { IList } from 'src/app/shared/interfaces/list.interface';

import { FormShoppingListComponent } from '../form-shopping-list/form-shopping-list.component';
import { HistoricProductsComponent } from '../history-products/historic-products.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  imports: [
    CommonModule,
    DrawerComponent,
    TableComponent,
    HeaderComponent,
    FormShoppingListComponent,
    HistoricProductsComponent,
    ExcludeDialogComponent,
    MatIconModule,
    MatButtonModule,
  ],
})
export class ShoppingListComponent implements OnDestroy {
  title: string = 'Lista de Compras';

  operation: Operation;
  openedDrawer: boolean;

  listEdit: IList;
  formFilter: FormGroup;

  dataSource: Array<IList> = [];
  dataSourceBase: Array<IList> = [];
  displayedColumns: string[] = ['id', 'name', 'qtd', 'actions'];

  openedDrawerHistoric = false;
  dataSourceHistoric: Array<IList> = [];

  destroy$ = new Subject<void>();

  constructor(
    private _dialog: MatDialog,
    private _toastr: ToastrService,
    private _readerTxtService: ReaderTxtService
  ) {
    this.operation = Operation.INDEX;
    this.getDataList();
  }

  getDataList(): void {
    this._readerTxtService
      .getAllTxt()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const arData = data.split('\n');
        this.dataSource = arData.map((line) => {
          const [id, name, qtd] = line.split(';');
          return { id: +id, name, qtd: +qtd };
        });
        this.dataSourceBase = this.dataSource;
      });
  }

  onHistoric(): void {
    this.openedDrawerHistoric = true;
    this.dataSource = this.dataSource;
  }

  addProduct(): void {
    this.operation = Operation.NEW;
    this.openedDrawer = true;
  }

  onClickRow(data: IList): void {
    this.operation = Operation.VIEW;
    this.openedDrawer = true;
    this.listEdit = data;
  }

  onDeleteItem(data: IList): void {
    this._dialog
      .open(ExcludeDialogComponent, {
        maxHeight: '80vh',
        height: AUTO_STYLE,
        data: {},
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (e) => {
        if (e?.confirm) {
          this.dataSource = this.dataSourceBase.filter(
            (list: IList) => JSON.stringify(list) !== JSON.stringify(data)
          );
          this.dataSourceBase = this.dataSource;
          this._toastr.success('Excluído com sucesso!');
        }
      });
  }

  onSearchProduct(searchText: string, dataSourceBase: Array<IList>): void {
    if (!dataSourceBase.length) {
      return;
    }
    searchText = searchText ? searchText.toString().toLocaleLowerCase() : '';

    this.dataSource = dataSourceBase.filter((obj) => {
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

  onSaveProduct(payload: IList): void {
    if (this.operation === Operation.NEW) {
      const invalid = this.validateProduct(payload);
      if (invalid) {
        return;
      }
      this.dataSource = [
        { ...payload, id: this.dataSourceBase.length + 1 },
        ...this.dataSourceBase,
      ];

      this.dataSourceHistoric.push({
        ...{ ...payload, id: this.dataSourceBase.length + 1 },
        dateUpdate: new Date(),
      });

      this._toastr.success('Incluído com sucesso!');
    } else {
      const index = this.dataSourceBase.findIndex(
        (list: IList) => JSON.stringify(list) === JSON.stringify(this.listEdit)
      );
      const invalid = this.validateProduct(payload, index);
      if (invalid) {
        return;
      }

      this.dataSourceBase[index] = {
        id: this.dataSourceBase.length + 1,
        ...payload,
      };
      this.dataSourceBase = [...this.dataSourceBase];
      this._toastr.success(
        `${this.listEdit.name} editada para ${payload.name}`
      );
      this.dataSourceHistoric.push({
        ...{ ...payload, id: this.dataSourceBase.length + 1 },
        dateUpdate: new Date(),
      });
    }
    this.dataSource = [...this.dataSource];
    this.dataSourceBase = this.dataSource;
    this.onClose();
  }

  validateProduct(payload: IList, index = -1): boolean {
    const indexInvalid = this.dataSourceBase.findIndex(
      (element) => element.name?.toUpperCase() === payload.name?.toUpperCase()
    );
    if (indexInvalid > -1 && indexInvalid !== index) {
      this._toastr.error('Produto já existente!');
      return true;
    }
    return false;
  }

  onClose(): void {
    this.openedDrawer = false;
    this.operation = Operation.INDEX;
    this.listEdit = null;
  }

  onCloseHistoric(): void {
    this.openedDrawerHistoric = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
