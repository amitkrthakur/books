import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputComponent } from '../input/input.component';
import { MaterialModule } from '../../material.module';
import { DialogData } from '../../model';

const regex = {
  URL: '^((http|https)://)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)',
  year: '(?:(?:18|19|20|21)[0-9]{2})'
}

@Component({
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, InputComponent],
  templateUrl: './dialog.component.html',
  styles: ['.actions { padding: 15px 24px; }']
})
export class DialogComponent {

  title = new FormControl('', Validators.required)
  imageUrl = new FormControl('', [Validators.required, Validators.pattern(regex.URL)])
  PublishDate = new FormControl('', [Validators.required, Validators.pattern(regex.year)])
  purchaseLink = new FormControl('', [Validators.required, Validators.pattern(regex.URL)])

  bookGroup = this.fb.group({
    title: this.title,
    imageUrl: this.imageUrl,
    PublishDate: this.PublishDate,
    purchaseLink: this.purchaseLink,
  })

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (data.type === 'modify' && data.book) {
      this.bookGroup.patchValue(data.book);
    }
  }

  submit() {
    if (this.bookGroup.valid) {
      this.dialogRef.close(this.data.type === 'modify' && this.data.book ?
        { id: this.data.book.id, ...this.bookGroup.value } : this.bookGroup.value)
    } else {
      this.bookGroup.markAllAsTouched();
    }
  }
}
