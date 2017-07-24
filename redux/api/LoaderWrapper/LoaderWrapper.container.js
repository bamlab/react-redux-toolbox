// @flow

import { connect } from 'react-redux';
import { isLoading } from '../loader';
import LoaderWrapper from './LoaderWrapper.component';

declare type PropsType = {
  loaderName: string,
  reducerName: string,
}

const mapStateToProps = (state, ownProps: PropsType) => ({
  loading: isLoading(state, ownProps.loaderName, ownProps.reducerName),
});

export default connect(mapStateToProps)(LoaderWrapper);
