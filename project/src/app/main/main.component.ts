import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.model'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  searchString: string;
  baseUrl: string = "https://www.googleapis.com/books/v1/volumes?q=*:";
  books = new Array<Book>();

  constructor(private api: HttpClient) {
    this.searchString = '';
  }

  ngOnInit() {
  }

  search() {
    let req = this.baseUrl + this.searchString;
    this.searchString = '';
    this.api.get(req).subscribe((response) => this.PopulateBooks(response['items']));
  }
  PopulateBooks(response: Object) {
    this.books.length = 0
    let i=0;
    for (var book in response) {
      this.books.push(new Book());
      try {
        this.books[i].img = response[i].volumeInfo.imageLinks.thumbnail;
      }
      catch (e){}
      this.books[i].title = response[i].volumeInfo.title;
      this.books[i].authors = response[i].volumeInfo.authors;
      this.books[i].categories = response[i].volumeInfo.categories;
      try {
        this.books[i].price =  response[i].saleInfo.listPrice.currencyCode+' '+response[i].saleInfo.listPrice.amount;
      }
      catch (e){}
      this.books[i].pageCount = response[i].volumeInfo.pageCount;
      this.books[i].date = response[i].volumeInfo.publishedDate;
      this.books[i].publisher = response[i].volumeInfo.publisher;
      i++;
    }
    console.log(this.books);
  }
}
