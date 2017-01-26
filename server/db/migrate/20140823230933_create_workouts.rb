class CreateWorkouts < ActiveRecord::Migration
  def change
    create_table :workouts do |t|
      t.integer :repmax
      t.references :cycles, index: true

      t.timestamps
    end
  end
end
