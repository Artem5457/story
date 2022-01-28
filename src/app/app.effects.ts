import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, map, switchMap} from "rxjs";
import {Action} from "@ngrx/store";
import {addItem, addItemSuccess, getItems, getItemsSuccess, updateItem, updateItemSuccess} from "./reducers/dashboard";
import {ItemsService} from "./items.service";
import {HttpClient} from "@angular/common/http";
import {Item} from "./app.component";

@Injectable()
export class AppEffects {
  addItem$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(addItem),
    switchMap((payload) =>
      this.itemsService
        .addItem(payload).pipe(
          map((item) => addItemSuccess({payload: item}))
      )
    )
  ));

  getItems$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(getItems),
    switchMap((payload) =>
      this.itemsService
        .getItems().pipe(
          map((items) => getItemsSuccess({payload: items}))
      ))
  ));

  // Так как из пута ничего не возвращается мы должны его получить из get
  updateItem$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(updateItem),
    switchMap(({payload}) =>
      this.itemsService
        .updateItem(payload).pipe(
          switchMap(
            () => this.http.get<Item>(`https://crudcrud.com/api/a9e8c82cd6764b43a943c8f3db01ee9e/unicorns/${payload._id}`)
          ),
          map((updateItem) => updateItemSuccess({payload: updateItem}))
      ))
  ))

  constructor(private actions$: Actions, private itemsService: ItemsService, private http: HttpClient) {}
}
