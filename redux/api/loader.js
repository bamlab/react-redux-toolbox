// @flow

import { put, call } from 'redux-saga/effects';

const MODULE_ACTION_KEY = 'react-redux-toolbox';

export const actionTypes = {
  SHOW_LOADER: `${MODULE_ACTION_KEY}/SHOW_LOADER`,
  HIDE_LOADER: `${MODULE_ACTION_KEY}/HIDE_LOADER`,
};

declare type LoaderStateType = {[loaderName: string]: boolean};

const initialState: LoaderStateType = {};

type ActionType = {
  type: string,
  loaderName: string,
}

export const showLoaderCreator = (loaderName: string) => ({
  type: actionTypes.SHOW_LOADER,
  loaderName,
});

export const hideLoaderCreator = (loaderName: string) => ({
  type: actionTypes.HIDE_LOADER,
  loaderName,
});

export const loaderReducer = (state: LoaderStateType = initialState, action: ActionType): ApiStateType => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER:
      return {
        ...state,
        [action.loaderName]: true,
      };
    case actionTypes.HIDE_LOADER:
      return {
        ...state,
        [action.loaderName]: false,
      };
    default:
      return state;
  }
};

export const isLoading = (state: any, loaderName: string, reducerName = 'loader') =>
  !!state[reducerName][loaderName];

export const addLoader = (saga: any, loaderName: string) =>
  function* (...args: any): SagaType {
    try {
      yield put(showLoaderCreator(loaderName));
      const result = yield call(saga, ...args);
      yield put(hideLoaderCreator(loaderName));
      return result;
    } catch (error) {
      yield put(hideLoaderCreator(loaderName));
      throw error;
    }
  };
