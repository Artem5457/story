import { Component } from '@angular/core';
import {concatMap, Observable} from 'rxjs';
import { ItemsService } from './items.service';
import {HttpClient} from "@angular/common/http";

export interface Item {
  _id?: string;
  name: string;
  age: number;
  colour: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  outItems: Item[] = [];
  name!: string;
  age!: number;
  color!: string;

  updateName!: string;
  updateAge!: number;
  updateColor!: string;
  updatedItem!: Item;

  constructor(
    private items: ItemsService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<Item[]>('https://crudcrud.com/api/6f4339083bd8455984253804be8f182a/unicorns').subscribe((res) => {
      this.outItems = res;
    })
  }

  addItem() {
    this.http.post<Item>('https://crudcrud.com/api/6f4339083bd8455984253804be8f182a/unicorns', {
      name: this.name,
      age: this.age,
      colour: this.color
    }).subscribe((res) => {
      this.outItems = [...this.outItems, res]
      console.log('res', res)
    })
  }

  itemToUpdate(item: Item) {
    this.updatedItem = {...item};
    this.updateName = item.name;
    this.updateAge = item.age;
    this.updateColor = item.colour;
  }

  updateItem() {
    this.http.put<Item>(`https://crudcrud.com/api/6f4339083bd8455984253804be8f182a/unicorns/${this.updatedItem?._id}`, {
      name: this.updateName,
      age: this.updateAge,
      colour: this.updateColor
    }).pipe(
      concatMap(() => this.http.get<Item>(`https://crudcrud.com/api/6f4339083bd8455984253804be8f182a/unicorns/${this.updatedItem?._id}`))
    ).subscribe((res) => {
      this.outItems = this.outItems.map((i) => {
        if (i._id === res._id) {
          return res;
        }

        return i
      })
    })
  }
}
