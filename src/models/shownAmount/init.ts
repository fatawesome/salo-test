import { $fetchingRequired, $shownAmount, showMore } from './';
import { guard } from 'effector';
import { $searchId, fetchTicketsFx } from '../tickets';

$shownAmount.on(
  showMore,
  (shown, payload) => {
    return shown + payload;
  }
);

$shownAmount.watch((state) => console.log('amount:', state))

guard({
  clock: $shownAmount,
  filter: $fetchingRequired,
  source: $searchId,
  target: fetchTicketsFx
});
