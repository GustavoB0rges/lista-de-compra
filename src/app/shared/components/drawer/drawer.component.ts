import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSidenavModule],
})
export class DrawerComponent {
  @Input() template: TemplateRef<any>;
  @Input() mode: 'over' | 'side' = 'over';
  @Input() opened: boolean;
}
