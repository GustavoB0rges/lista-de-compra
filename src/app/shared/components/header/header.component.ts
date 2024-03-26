import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';

import { Operation } from '../../enums/operation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class HeaderComponent implements AfterViewInit {
  @Input() type: 'default' | 'form' = 'default';
  @Input({ required: true }) title: string;
  @Input({ required: true }) operation: Operation;

  @Input() showFilter = true;
  @Input() saveDisabled: boolean;
  @Input() showEdit = true;

  @Output() histotic = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() search = new EventEmitter();

  formFilter = new FormGroup({ filter: new FormControl(null) });

  destroy$ = new Subject<void>();

  constructor() {}

  ngAfterViewInit(): void {
    if (this.showFilter) {
      this.listenFilterChanges();
    }
  }

  listenFilterChanges(): void {
    this.formFilter
      .get('filter')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((search: string) => this.search.emit(search));
  }

  onHistoric(): void {
    this.histotic.emit();
  }

  onAdd(): void {
    this.add.emit();
  }

  onEdit(): void {
    this.edit.emit();
  }

  onSave(): void {
    this.save.emit();
  }

  onClose(): void {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
