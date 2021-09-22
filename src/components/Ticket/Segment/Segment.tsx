import React from 'react';
import { Segment as SegmentType } from '../../../models';
import styled from 'styled-components';
import { LabeledInfo } from '../LabeledInfo';
import { getArrivalTime, getDepartureTime, getRouteTime } from '../helpers';

interface SegmentProps {
  segment: SegmentType;
  className?: string;
}

/**
 Нет пересадок
 1 пересадка   1     group A
 2 пересадки   2-4   group B
 5 пересадок   5-10  group C
 */
const getPluralizedStopsText = (stops: string[]) => {
  // imperative stuff
  if (stops.length === 0) {
    return 'Нет пересадок';
  }

  const numOfStops = stops.length;
  const baseText = `${numOfStops} пересад`;

  const reminder = numOfStops % 10;
  const isPluralGroupA = reminder === 1;
  const isPluralGroupB = (numOfStops < 5 || numOfStops > 21) && (reminder >= 2 && reminder <= 4);

  if (isPluralGroupA) {
    return baseText + 'ка';
  } else if (isPluralGroupB) {
    return baseText + 'ки';
  }
  return baseText + 'ок';
}

const Segment: React.FC<SegmentProps> = ({ segment, className }) => {
  return (
    <div className={className}>
      <LabeledInfo
        label={`${segment.origin} – ${segment.destination}`}
        information={`${getDepartureTime(segment)} – ${getArrivalTime(segment)}`}
      />
      <LabeledInfo
        label={'В пути'}
        information={getRouteTime(segment)}
      />
      <LabeledInfo
        label={getPluralizedStopsText(segment.stops)}
        information={segment.stops.join(', ')}
      />
    </div>
  )
}

// TODO: make correct layout (try grids u stupid).
const StyledSegment = styled(Segment)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

export default StyledSegment;
