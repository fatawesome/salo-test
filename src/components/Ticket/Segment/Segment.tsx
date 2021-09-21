import React from 'react';
import { Segment as SegmentType } from '../../../models';
import styled from 'styled-components';
import { LabeledInfo } from '../LabeledInfo';
import { getArrivalTime, getDepartureTime, getRouteTime } from '../helpers';

interface SegmentProps {
  segment: SegmentType;
  className?: string;
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
        label={`${segment.stops.length} пересадки`} // TODO: pluralization.
        information={segment.stops.join(',')}
      />
    </div>
  )
}

// TODO: make correct layout (try grids u stupid).
const StyledSegment = styled(Segment)`
  display: flex;
  justify-content: space-between;
`

export default StyledSegment;
