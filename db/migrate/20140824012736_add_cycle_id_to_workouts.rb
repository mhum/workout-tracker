class AddCycleIdToWorkouts < ActiveRecord::Migration
  def change
    add_column :workouts, :cycle_id, :integer
    remove_column :workouts, :cycles_id, :integer
  end
end
