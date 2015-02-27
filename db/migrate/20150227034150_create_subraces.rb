class CreateSubraces < ActiveRecord::Migration
  def change
    create_table :subraces do |t|
      t.string :title
      t.text :description
      t.references :race, index: true

      t.timestamps
    end
  end
end
