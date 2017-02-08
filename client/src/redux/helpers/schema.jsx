import { schema } from 'normalizr';

const workoutLift = new schema.Entity('workoutLifts');

const lift = new schema.Entity('lifts', {
  workout_lift: workoutLift
});

const workoutType = new schema.Entity('workoutTypes');

const workout = new schema.Entity('workouts', {
  lifts: [lift],
  workout_type: workoutType
});

export const cycle = new schema.Entity('cycles', {
  workouts: [workout]
});

export const cycleListSchema = [cycle];
