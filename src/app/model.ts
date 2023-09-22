interface AuthorDetails {
  author: string;
  birthday: string;
  birthPlace: string;
  books: Book[];
}

interface Book {
  id: string;
  imageUrl: string;
  title: string;
  purchaseLink: string;
  PublishDate: string;
}

interface DialogData {
  type: 'add' | 'modify' | 'delete',
  book?: Book
}

export { AuthorDetails, Book, DialogData }
