class AddDateColumnToMeetup < ActiveRecord::Migration[6.1]
  def up
    add_column :meetups, :meeting_date, :date
    execute "UPDATE meetups SET meeting_date = '#{Date.current.to_s(:db)}' "
    change_column :meetups, :meeting_date, :date, null: false
  end

  def down
    remove_column :meetups, :meeting_date, :date
  end
end
