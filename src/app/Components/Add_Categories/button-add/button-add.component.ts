import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-add',
  imports: [FormsModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './button-add.component.html',
})
export class ButtonAddComponent {
  constructor(private dialog: MatDialog) {}

  emitedValue = output<{
    name: string | undefined;
    image: string | undefined;
  }>();

  onOpen() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.emitedValue.emit({
          name: result.name,
          image: result.image,
        });
      }
    });
  }
}
