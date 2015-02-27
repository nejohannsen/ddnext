class CreateGameClasses < ActiveRecord::Migration
  def change
    create_table :game_classes do |t|
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
