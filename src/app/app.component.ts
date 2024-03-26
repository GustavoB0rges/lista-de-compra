import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ShoppingListComponent } from './pages/shopping-list/shopping-list/shopping-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ShoppingListComponent, MatDialogModule],
})
export class AppComponent {}
