class Workout < ActiveRecord::Base
  belongs_to :workout_type
  belongs_to :cycle
  has_many :lifts, dependent: :destroy
  
  default_scope {joins(:workout_type).order('workout_types.sort_order ASC') }
  
  before_create :default_values
  
  def working_max
    (((repmax*0.9)/5).round)*5
  end
  
  private
    def default_values
      self.repmax ||= 0
    end
end
