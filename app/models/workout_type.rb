class WorkoutType < ActiveRecord::Base
  has_many :workouts
  default_scope { order('sort_order ASC') }
  
  before_create :default_values
  
    private
    def default_values
      self.active ||= true
    end
end
