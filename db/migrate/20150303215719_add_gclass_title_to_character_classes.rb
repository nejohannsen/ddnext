class AddGclassTitleToCharacterClasses < ActiveRecord::Migration
  def change
    add_column :character_classes, :gclass_title, :string
  end
end
