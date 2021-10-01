import React from 'react';

import Column from '../Column';
import { snapshotWithTheme } from '../../../../theme/utils';

describe('Column component', () => {
  test('renders', () => {
    const component = snapshotWithTheme(
      <Column>
        <div>Row 1</div>
        <div>Row 2</div>
        <div>Row 3</div>
      </Column>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
