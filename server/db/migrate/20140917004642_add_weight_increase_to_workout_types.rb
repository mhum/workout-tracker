class AddWeightIncreaseToWorkoutTypes < ActiveRecord::Migration
  def change
    add_column :workout_types, :weight_increase, :integer
  end
end
