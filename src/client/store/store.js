/**
 * Created by Raion on 2019/3/9.
 */

import { createStore } from 'redux';
import rootReducers from '../reducer';

export default function configureStore(initialState = {}) {
  return createStore(rootReducers, initialState);
}
