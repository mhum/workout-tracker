class AddUserIdToCycles < ActiveRecord::Migration
  def change
    add_column :cycles, :user_id, :integer
  end
end
