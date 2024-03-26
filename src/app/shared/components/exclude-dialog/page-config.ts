import { IFormField } from '@connect-shared/interfaces/form-filter.interface';
import { TableColumn } from '@connect-shared/models/table-column.interface';

export class PageConfig {

  columns: TableColumn<any>[] = [
    {
      label: '',
      property: 'checkbox',
      type: 'checkbox',
      visible: true,
      align: 'start',
    },
    {
      label: 'Descrição',
      property: 'description',
      type: 'text',
      visible: true,
      align: 'start',
    },
  ];

  columns2: TableColumn<any>[] = [
    {
      label: 'Descrição',
      property: 'description',
      type: 'text',
      visible: true,
      align: 'start',
    },
    {
      label: 'Excluir',
      property: 'close',
      type: 'icon',
      visible: true,
      align: 'start',
    },
  ];

 aioTableData = [
    {
      description: 'Filtro teste',
    },
    {
      description: 'Filtro teste 2',
    }
  ];

  filterFields: IFormField[] = [
    {
      formcontrolname: 'id',
      type: 'number',
      label: 'Id',
      min: 1,
      fxFlex: '45'
    },
    {
      formcontrolname: 'selectTeste',
      type: 'select',
      label: 'Select Exemplo',
      select: {
        data: [],
        valueField: 'id',
        displayField: 'descricao',
        searchField: 'descricao'
      },
      fxFlex: '45'
    },
    {
      formcontrolname: 'dataTeste',
      type: 'datepicker',
      label: 'Data de Exemplo',
      fxFlex: '45'
    },
    {
      formcontrolname: 'toggleExemplo',
      type: 'toggle',
      label: 'Toggle de exemplo',
      fxFlex: '45'
    }
  ];

}
