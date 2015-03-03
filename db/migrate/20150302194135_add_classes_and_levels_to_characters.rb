class AddClassesAndLevelsToCharacters < ActiveRecord::Migration
  def change
    add_column :characters, :classes_and_levels, :string
  end
end
