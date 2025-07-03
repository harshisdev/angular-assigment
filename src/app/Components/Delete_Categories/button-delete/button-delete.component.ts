import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-button-delete',
  imports: [FormsModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './button-delete.component.html',
  styleUrl: './button-delete.component.css',
})
export class ButtonDeleteComponent {
  constructor(private dialog: MatDialog) {}

  emitedValue = output<{
    id: string | undefined;
  }>();

  onOpen() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.emitedValue.emit({
          id: result.id,
        });
      }
    });
  }
}
