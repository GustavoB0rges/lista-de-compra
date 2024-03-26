import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exclude-dialog',
  templateUrl: './exclude-dialog.component.html',
  styleUrls: ['./exclude-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
})
export class ExcludeDialogComponent {
  title: any;
  subtitle: any;

  constructor(
    private _dialog: MatDialogRef<ExcludeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.subtitle = data.subtitle;
  }

  onCancel(): void {
    this._dialog.close({ confirm: false });
  }

  onSave(): void {
    this._dialog.close({ confirm: true });
  }
}
