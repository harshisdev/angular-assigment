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
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-dialog',
  imports: [
    NgIf,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.css',
})
export class UpdateDialogComponent {
  constructor(private dialogRef: MatDialogRef<UpdateDialogComponent>) {}
  UpdateCategoryForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  get id() {
    return this.UpdateCategoryForm.controls.id;
  }
  get name() {
    return this.UpdateCategoryForm.controls.name;
  }

  onSubmit() {
    if (this.UpdateCategoryForm.invalid) {
      return;
    }
    this.dialogRef.close(this.UpdateCategoryForm.value);
  }
}
