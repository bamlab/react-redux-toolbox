// @flow

import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type PropsType = {
  loading: boolean,
  loaderComponent: (props: any) => any,
  children: any,
}

const LoaderWrapper = (props: PropsType) => (
  props.loading ? (
    <View style={styles.container}>
      { props.loaderComponent }
    </View>
  ) : props.children
);

LoaderWrapper.defaultProps = {
  loaderComponent: <ActivityIndicator animating />,
};

export default LoaderWrapper;
