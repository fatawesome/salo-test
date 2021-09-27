import { $canShowMore, $fetchingRequired, $shownAmount, showMore } from './';
import { guard } from 'effector';
import { $searchId, fetchTicketsFx } from '../tickets';

$shownAmount.on(
  showMore,
  (shown, payload) => {
    return shown + payload;
  }
);

guard({
  clock: showMore,
  filter: $fetchingRequired,
  source: $searchId,
  target: fetchTicketsFx
});
