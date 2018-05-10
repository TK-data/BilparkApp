export const TRAVELLOG_FROM = 'TRAVELLOG_FROM';
export const TRAVELLOG_TO = 'TRAVELLOG_TO';
export const TRAVELLOG_DISTANCE = 'TRAVELLOG_DISTANCE';


export function travelLogFrom(positionFrom) {
  return {
    type: 'TRAVELLOG_FROM',
    positionFrom,
  };
}

export function travelLogTo(positionTo) {
  return {
    type: 'TRAVELLOG_TO',
    positionTo,
  };
}

export function travelLogDistance(distance) {
  return {
    type: 'TRAVELLOG_DISTANCE',
    distance,
  };
}
