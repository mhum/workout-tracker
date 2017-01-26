class CreateWorkoutTypes < ActiveRecord::Migration
  def change
    create_table :workout_types do |t|
      t.string :title
      t.boolean :active
      t.integer :sort_order
    end
    add_column :workouts, :workout_type_id, :integer
    
    add_column :cycles, :number, :integer
    remove_column :cycles, :title, :string
  end
end
