import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../../Interfaces/api';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { updateProduct } from '../../Interfaces/add';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProdDialogComponent } from '../Update_Product/update-prod-dialog/update-prod-dialog.component';
import { SharedcartService } from '../../services/sharedcart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    FormsModule,
    CommonModule,
    MatGridListModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  constructor(
    private dialog: MatDialog,
    private sharedcart: SharedcartService
  ) {}

  @Input() productList!: Product[];
  @Output() emitededelete = new EventEmitter<{ id: string }>();
  @Output() emitedupdateObj = new EventEmitter<updateProduct>();

  @Input() productId?: string;
  @Input() title!: string;
  @Input() price!: number;

  quantities: { [productId: string]: number } = {};
  totalCartItems: number = 0;

  deleteProduct(id: string) {
    this.emitededelete.emit({ id });
  }

  updateProduct(id: string) {
    const dialogRef = this.dialog.open(UpdateProdDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.emitedupdateObj.emit({
          title: result.title,
          description: result.description,
          price: +result.price,
          images: result.images,
          productId: id,
        });
      }
    });
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src =
      'https://via.placeholder.com/150x150?text=No+Image';
  }

  increment(productId: string) {
    this.quantities[productId] = (this.quantities[productId] || 0) + 1;
  }

  decrement(productId: string) {
    if (this.quantities[productId] > 0) {
      this.quantities[productId]--;
    }
  }

  Addtocart(product: Product) {
    const quantity = this.quantities[product.id] || 0;
    if (quantity > 0) {
      const obj = {
        productId: product.id,
        quantity,
        title: product.title,
        price: product.price,
      };
      this.sharedcart.cartadding(obj);

      this.totalCartItems += quantity;
    }
  }
}
