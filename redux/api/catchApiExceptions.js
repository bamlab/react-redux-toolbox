// @flow

import { delay } from 'redux-saga';
import { call, race } from 'redux-saga/effects';

const API_TIMEOUT = 10000;
const TIMEOUT_ERROR = 'TIMEOUT_ERROR';

export default (
  saga: any,
  timeout: number = API_TIMEOUT,
  handleApiException: (error: any) => void = console.log,
) =>
  function* (...args: any): SagaType {
    try {
      const { hasTimeOuted } = yield race({
        hasTimeOuted: call(delay, timeout),
        executeApiSaga: saga.apply(this, args),
      });
      if (hasTimeOuted) {
        handleApiException(new Error(TIMEOUT_ERROR));
      }
    } catch (error) {
      handleApiException(error);
    }
  };
