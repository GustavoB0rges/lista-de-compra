import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { Operation } from 'src/app/shared/enums/operation';
import { IList } from 'src/app/shared/interfaces/list.interface';

@Component({
  selector: 'app-form-shopping-list',
  templateUrl: './form-shopping-list.component.html',
  styleUrls: ['./form-shopping-list.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    HeaderComponent,
  ],
})
export class FormShoppingListComponent implements OnChanges {
  @Input({ required: true }) list: IList;
  @Input({ required: true }) operation: Operation;

  @Output() save = new EventEmitter();
  @Output() close = new EventEmitter();

  form: FormGroup;
  title: string;

  constructor() {
    this.title = 'Adicionando';
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('list' in changes && this.list) {
      if (this.operation === Operation.VIEW) {
        this.title = 'Visualizando #' + this.list.id;
        this.form.disable();
        this.patchFormValue(this.list);
      }
    }
  }

  createForm(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: null, disabled: true }),
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      qtd: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  patchFormValue(formValue: IList): void {
    this.form.patchValue(formValue);
  }

  editProduct(): void {
    this.operation = Operation.EDIT;
    this.title = 'Editando #' + this.list.id;
    this.form.enable();
    this.form.get('id')?.disable();
  }

  saveProduct(): void {
    this.save.emit(this.form.getRawValue());
  }

  onClose(): void {
    this.close.emit();
  }
}
