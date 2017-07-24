import React from 'react';
import { Text, View } from 'react-native';
import { shallow } from 'enzyme';
import getNodeText from './getNodeText';

describe('getNodeText', () => {
  it('returns the sum of the two nodes text', () => {
    const component = shallow(<View>
      <Text>first text</Text>
      <Text>second text</Text>
    </View>);

    expect(getNodeText(component)).toEqual('first textsecond text');
  });
});
