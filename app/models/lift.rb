class Lift < ActiveRecord::Base
  belongs_to :workout
  belongs_to :workout_lift
end
