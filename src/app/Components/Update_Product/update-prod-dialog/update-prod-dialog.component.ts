import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-update-prod-dialog',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './update-prod-dialog.component.html',
  styleUrl: './update-prod-dialog.component.css',
})
export class UpdateProdDialogComponent {
  constructor(private dialogRef: MatDialogRef<UpdateProdDialogComponent>) {}

  UpdateProductForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    images: new FormControl('', [Validators.required]),
  });

  get title() {
    return this.UpdateProductForm.controls.title;
  }
  get description() {
    return this.UpdateProductForm.controls.description;
  }
  get price() {
    return this.UpdateProductForm.controls.price;
  }
  get images() {
    return this.UpdateProductForm.controls.images;
  }

  onSubmit() {
    if (this.UpdateProductForm.invalid) {
      return;
    }
    this.dialogRef.close(this.UpdateProductForm.value);
  }
}
