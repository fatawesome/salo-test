import React from 'react';

import Checkbox from '../Checkbox';
import { snapshotWithTheme, uiWithTheme } from '../../../../theme/utils';
import userEvent from '@testing-library/user-event';
import { queryHelpers, screen } from '@testing-library/react';

describe('Checkbox component', () => {
  const label = 'label'
  const changeHandler = jest.fn();
  let component: React.ReactNode;

  beforeEach(() => {
    changeHandler.mockClear();
    component = (
      <Checkbox
        id="test id"
        checked={true}
        onChange={changeHandler}
        disabled={false}
      >
        {label}
      </Checkbox>
    );
  })

  test('renders correctly', () => {
    const snapshot = snapshotWithTheme(component);
    const tree = snapshot.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('triggers change handler', () => {
    test('when clicked on text', () => {
      uiWithTheme(component);
      userEvent.click(screen.getByText(label));
      expect(changeHandler).toBeCalledTimes(1);
    });

    test('when clicked on box', () => {
      uiWithTheme(component);
      userEvent.click(screen.getByTestId('checkbox-box'));
      expect(changeHandler).toBeCalledTimes(1);
    })
  })
});
