# React Redux Utils

## Redux

### API Loaders

#### Saga Decorator

`react-redux-toolbox` exposes a decorator to wrap your saga between two action dispatched.

```javascript
import { addLoader } from 'react-redux-toolbox';

export function* watchFetchMovies(): SagaType {
  yield takeLatest(actionTypes.FETCH_MOVIES, addLoader(fetchMovies, 'movies'));
}
```

In the example above,
```javascript
{
  type: 'react-redux-toolbox/SHOW_LOADER',
  loaderName: 'movies',
}
```
will be dispatched before the action, and
```javascript
{
  type: 'react-redux-toolbox/SHOW_LOADER',
  loaderName: 'movies',
}
```
just after.

#### Loader reducer

`react-redux-toolbox` also provides a reducer that you can add to your store, which will to the actions dipatched by the Saga Decorator to update your store:

```javascript
import { combineReducers } from 'redux';
import { loaderReducer } from 'react-redux-toolbox';

const rootReducer = combineReducers({
  loader: loaderReducer,
  ...
});
```

**A selector** is also included:
```javascript
export const isLoading = (state: any, loaderName: string, reducerName = 'loader'): boolean
```

#### Automatically change your components into Loaders

When using the saga decorator, with the `loader` reducer added to your store, wrap your components inside a `LoaderWrapper` and a loader will be displayed in their place when the `loaderName` is marked as loading.

```javascript
import { LoaderWrapper } from 'react-redux-toolbox';

...

render() {
  return (
    <LoaderWrapper loaderName="movies">
      <Movies>
    </LoaderWrapper>
  )
}
```

### Error handling

`react-redux-toolbox` exposes a decorator to automatically handle common API errors. For instance:

```javascript
import { addLoader, catchApiExceptions as catchApiExceptionsUtil } from 'react-redux-toolbox';

const handleApiException = (error: any) => {
  if (__DEV__) console.warn(error);

  if (!error.response) {
    Toast.show('Connection error');
    return;
  }

  Toast.show('Something bad happened');
};

const catchApiExceptions = (saga, timeout) => catchApiExceptionsUtil(saga, timeout, handleApiException);

export function* watchFetchMovies(): SagaType {
  yield takeLatest(actionTypes.FETCH_MOVIES, addLoader(
    catchApiExceptions(fetchMovies),
    'movies'
  ));
}
```

## Debug

### Setup React Native debugger

Redirect network calls to the react native debugger:
```javascript
import 'react-redux-toolbox/debug/setupReactNativeDebugger';
```

## Testing

### `getNodeText`

```javascript
import React from 'react';
import { Text, View } from 'react-native';
import { shallow } from 'enzyme';
import { getNodeText } from 'react-redux-toolbox';

describe('getNodeText', () => {
  it('returns the sum of the two nodes text', () => {
    const component = shallow(<View>
      <Text>first text</Text>
      <Text>second text</Text>
    </View>);

    expect(getNodeText(component)).toEqual('first textsecond text');
  });
});
```
