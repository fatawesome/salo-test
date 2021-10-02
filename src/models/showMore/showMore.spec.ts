import { allSettled, fork } from 'effector';
import { $shownAmount, AMOUNT_TO_SHOW, resetShownAmount, showMore } from './index';
import './init';

describe('Show more module', () => {
  const scope = fork();
  afterEach(async () => {
    await allSettled(resetShownAmount, { scope });
  });

  test('When showMore is triggered, amount to show is increased by given value', async () => {
    const oldState = scope.getState($shownAmount);
    await allSettled<number>(showMore, { scope, params: AMOUNT_TO_SHOW });
    expect(scope.getState($shownAmount)).toEqual(oldState + AMOUNT_TO_SHOW);
  });
});
