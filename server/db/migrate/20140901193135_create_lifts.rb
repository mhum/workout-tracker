class CreateLifts < ActiveRecord::Migration
  def change
    create_table :lifts do |t|
      t.integer :reps_completed
      t.integer :workout_id

      t.belongs_to :workout_lift
      t.timestamps
    end
    
    create_table :workout_lifts do |t|
      t.string :title
      t.float :wu1_offset
      t.float :wu2_offset
      t.float :wu3_offset
      t.float :l1_offset
      t.integer :l1_reps
      t.float :l2_offset
      t.integer :l2_reps
      t.float :l3_offset
      t.integer :l3_reps
      t.integer :sort_order
    end
    
    create_table :workout_lifts_types, id: false do |t|
      t.belongs_to :workout_lift
      t.belongs_to :workout_type
    end
  end
end
