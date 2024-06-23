import { legacy_createStore as createStore, applyMiddleware, Store } from 'redux';
import rootReducer, { AppState } from './reducers';
import { thunk } from 'redux-thunk';
import { ProfileActionTypes } from '@/contracts/actions';

const store: Store<AppState, ProfileActionTypes> = createStore(
  rootReducer, 
  {},
  applyMiddleware(thunk)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;