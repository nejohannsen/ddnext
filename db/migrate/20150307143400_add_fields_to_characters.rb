class AddFieldsToCharacters < ActiveRecord::Migration
  def change
    add_column :characters, :faction, :string
    add_column :characters, :dci, :string
    add_column :characters, :race_info, :text
  end
end
