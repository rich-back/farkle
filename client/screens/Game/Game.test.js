import React from 'react';
import renderer from 'react-test-renderer';

import Game from './Game';

describe('<Game />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Game />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
