class WorkoutLift < ApplicationRecord
  belongs_to :workout
  has_and_belongs_to_many :workout_types
end
