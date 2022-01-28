import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from "@ngrx/store";
import {Item} from "../app.component";

export const ITEMS_DASHBOARD_KEY = 'itemsDashboard';

// Action (check this part of code)
export const getItems = createAction('[Items] Get items');
export const getItemsSuccess = createAction('[Items] Get items success', props<{payload: Item[]}>());
export const addItem = createAction('[Items] Add item', props<Item>());
export const updateItem = createAction('[Items] Update item', props<{payload: Item}>());
export const addItemSuccess = createAction('[Items] Add item success', props<{payload: Item}>());
export const updateItemSuccess = createAction('[Items] Update Item Success', props<{payload: Item}>());


export interface ItemsState {
  items: Item[];
}

export const initialState: ItemsState = {
  items: []
}

export const itemsReducer = createReducer(
  initialState,
  on(getItemsSuccess, (state, action) => ({
    ...state,
    items: [...action.payload]
  })),
  on(addItemSuccess, (state, action) => ({
    ...state,
    items: [...state.items, action.payload]
  })),
  on(updateItemSuccess, (state, action) => ({
    ...state,
    items: state.items.map((item) => {
      if (item._id === action.payload._id) {
        return action.payload;
      }

      return item;
    })
  }))
  // on(addItem, (state, action) => ({
  //   ...state,
  //   // items: [...state, action.payload]
  // })),
  // on(updateItem, (state, action) => ({
  //   ...state,
  //   items: state.items.map((item) => {
  //     if (item._id === action.payload._id) {
  //       return action.payload;
  //     }
  //
  //     return item;
  //   })
  // })),
  // on(itemToUpdate, (state, action) => ({
  //
  // }))
);

export const featureSelector = createFeatureSelector<ItemsState>(ITEMS_DASHBOARD_KEY)
export const itemsSelector = createSelector(
  featureSelector,
  state => state.items
);
