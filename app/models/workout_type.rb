class WorkoutType < ActiveRecord::Base
  has_many :workouts
  has_and_belongs_to_many :workout_lifts
  default_scope { order('sort_order ASC') }
  
  before_create :default_values
  
    private
    def default_values
      self.active ||= true
    end
end
