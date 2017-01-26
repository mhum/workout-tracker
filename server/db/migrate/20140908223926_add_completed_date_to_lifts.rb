class AddCompletedDateToLifts < ActiveRecord::Migration
  def change
    add_column :lifts, :completed_date, :date
  end
end
