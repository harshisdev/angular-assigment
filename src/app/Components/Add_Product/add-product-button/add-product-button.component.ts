import { Component, input, output, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Category, NewProduct } from '../../../Interfaces/api';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-add-product-button',
  imports: [MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './add-product-button.component.html',
})
export class AddProductButtonComponent {
  constructor(private dialog: MatDialog) {}
  categoryLi = input<Category[]>();
  emitedValue = output<NewProduct>();

  onopen() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '600px',
      data: this.categoryLi(),
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.emitedValue.emit({
          title: result.title,
          description: result.description,
          images: [result.image],
          price: +result.price,
          categoryId: +result.CatId,
        });
      }
    });
  }
}
