class CreateCycles < ActiveRecord::Migration
  def change
    create_table :cycles do |t|
      t.string :title
      t.references :users, index: true

      t.timestamps
    end
  end
end
