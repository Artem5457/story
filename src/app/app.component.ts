import { Component } from '@angular/core';
import {concatMap, Observable} from 'rxjs';
import { ItemsService } from './items.service';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {addItem, getItems, itemsSelector, updateItem} from "./reducers/dashboard";

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
  outItems$: Observable<Item[]> = this.store.select(itemsSelector);
  name!: string;
  age!: number;
  color!: string;

  updateName!: string;
  updateAge!: number;
  updateColor!: string;
  updateId!: string;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getItems());
  }

  addItem() {
    // this.http.post<Item>('https://crudcrud.com/api/a9e8c82cd6764b43a943c8f3db01ee9e/unicorns', {
    //   name: this.name,
    //   age: this.age,
    //   colour: this.color
    // }).subscribe((res) => {
    //   this.outItems = [...this.outItems, res]
    //   console.log('res', res)
    // })
    this.store.dispatch(addItem(
      {
        name: this.name,
        age: this.age,
        colour: this.color
      }
    ));
  }

  itemToUpdate(item: Item) {
    this.updateId = item?._id;
    this.updateName = item.name;
    this.updateAge = item.age;
    this.updateColor = item.colour;
  }

  updateItem() {
    // this.http.put<Item>(`https://crudcrud.com/api/a9e8c82cd6764b43a943c8f3db01ee9e/unicorns/${this.updatedItem?._id}`, {
    //   name: this.updateName,
    //   age: this.updateAge,
    //   colour: this.updateColor
    // }).pipe(
    //   concatMap(() => this.http.get<Item>(`https://crudcrud.com/api/a9e8c82cd6764b43a943c8f3db01ee9e/unicorns/${this.updatedItem?._id}`))
    // ).subscribe((res) => {
    //   this.outItems = this.outItems.map((i) => {
    //     if (i._id === res._id) {
    //       return res;
    //     }
    //
    //     return i
    //   })
    // })

    this.store.dispatch(updateItem(
      {
        payload: {
          _id: this.updateId,
          name: this.updateName,
          age: this.updateAge,
          colour: this.updateColor
        }
      }
    ));

    // console.log('Updated item: ', this.updatedItem);
    console.log('Updated item: ', this.updateName);
    console.log('Updated item: ', this.updateItem);
    console.log('Updated item: ', this.updateColor);
  }
}
