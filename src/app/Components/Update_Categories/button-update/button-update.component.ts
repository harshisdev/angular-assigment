import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-button-update',
  imports: [FormsModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './button-update.component.html',
  styleUrl: './button-update.component.css',
})
export class ButtonUpdateComponent {
  constructor(private dialog: MatDialog) {}

  emitedValue = output<{
    id: string | undefined;
    name: string | undefined;
  }>();

  onOpen() {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.emitedValue.emit({
          id: result.id,
          name: result.name,
        });
      }
    });
  }
}
