class RemoveFieldNameFromCycles < ActiveRecord::Migration
  def change
    remove_column :cycles, :users_id, :integer
  end
end
