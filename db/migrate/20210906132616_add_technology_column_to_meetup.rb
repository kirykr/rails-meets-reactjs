class AddTechnologyColumnToMeetup < ActiveRecord::Migration[6.1]
  def change
    add_column :meetups, :technology, :string,  null: false, default: "Rails"
  end
end
