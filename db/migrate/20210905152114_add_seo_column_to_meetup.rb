class AddSeoColumnToMeetup < ActiveRecord::Migration[6.1]
  def change
    add_column :meetups, :seo, :string
  end
end
