class AddGuestsColumnToMeetup < ActiveRecord::Migration[6.1]
  def change
    add_column :meetups, :guests, :text
  end
end
