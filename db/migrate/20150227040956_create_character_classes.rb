class CreateCharacterClasses < ActiveRecord::Migration
  def change
    create_table :character_classes do |t|
      t.references :character, index: true
      t.references :game_class, index: true
      t.integer :character_level
      t.string :gclass_title

      t.timestamps
    end
  end
end
