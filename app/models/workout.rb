class Workout < ActiveRecord::Base
  belongs_to :cycle
  
  def working_max
    (((repmax*0.9)/5).round)*5
  end
end
