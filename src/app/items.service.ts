import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Item } from './app.component';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})

export class ItemsService {
  // items$ = new BehaviorSubject<Item[]>([]);
  // updateAction$ = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('https://crudcrud.com/api/a9e8c82cd6764b43a943c8f3db01ee9e/unicorns');
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>('https://crudcrud.com/api/a9e8c82cd6764b43a943c8f3db01ee9e/unicorns', item);
  }

  updateItem(updateItem: Item): Observable<Item> {
    return this.http.put<Item>(`https://crudcrud.com/api/a9e8c82cd6764b43a943c8f3db01ee9e/unicorns/${updateItem?._id}`,
      {
          name: updateItem.name,
          age: updateItem.age,
          colour: updateItem.colour
      });
  }
}
