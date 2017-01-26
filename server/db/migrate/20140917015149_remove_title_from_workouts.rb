class RemoveTitleFromWorkouts < ActiveRecord::Migration
  def change
    remove_column :workouts, :title, :string
  end
end
