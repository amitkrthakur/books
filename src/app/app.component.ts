import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BookComponent } from './book/book.component';
import { MaterialModule } from './material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from './data.service';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MaterialModule, BookComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public data$ = this.dataService.authorData$;
  public books$ = this.dataService.books$;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  sortByTitle() {
    this.dataService.sortByTitle();
  }
  sortByDate() {
    this.dataService.sortByPublishDate();
  }

  addBook() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { type: 'add' },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataService.addBook(data);
        this.snackBar.open('Book added', 'Success', { duration: 2500 })
      }
    });
  }
}
