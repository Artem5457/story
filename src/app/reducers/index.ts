import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {ITEMS_DASHBOARD_KEY, itemsReducer, ItemsState} from "./dashboard";

export interface State {
  [ITEMS_DASHBOARD_KEY]: ItemsState
}

export const reducers: ActionReducerMap<State> = {
  [ITEMS_DASHBOARD_KEY]: itemsReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
