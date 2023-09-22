import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';
import { Book, DialogData } from '../model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import { DialogComponent } from '../components/dialog/dialog.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input({ required: true }) book!: Book;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  editBook(book: Book) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { type: 'modify', book },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataService.updateBook(data);
        this.snackBar.open('Book Updated', 'Success', { duration: 2500 })
      }
    });
  }

  deleteBook(book: Book) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { type: 'delete', book }
    });

    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.dataService.deleteBook(id);
        this.snackBar.open('Book deleted', 'Success', { duration: 2500 })
      }
    });
  }
}
