import { $canShowMore, $fetchingRequired, $shownAmount, resetShownAmount, showMore } from './';
import { guard } from 'effector';
import { $searchId, fetchTicketsFx } from '../tickets';

$shownAmount.on(
  showMore,
  (shown, payload) => {
    return shown + payload;
  }
);

$shownAmount.reset([resetShownAmount]);

guard({
  clock: showMore,
  filter: $fetchingRequired,
  source: $searchId,
  target: fetchTicketsFx
});
