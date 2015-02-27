class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|

      t.timestamps
      t.string :name
      t.string :player
      t.integer :level
      #class will be a relationship to allow for level per class
      t.string :background
      t.string :race
      t.string :alignment
      t.integer :experince_points
      #ability scores
      t.integer :ability_str
      t.integer :ability_dex
      t.integer :ability_con
      t.integer :ability_int
      t.integer :ability_wis
      t.integer :ability_cha
      #saving throws
      t.integer :saving_str
      t.integer :saving_dex
      t.integer :saving_con
      t.integer :saving_int
      t.integer :saving_wis
      t.integer :saving_cha
      #skills
      t.integer :skill_acrobatics
      t.integer :skill_animal_handling
      t.integer :skill_arcana
      t.integer :skill_athletics
      t.integer :skill_deception
      t.integer :skill_history
      t.integer :skill_insight
      t.integer :skill_intimidation
      t.integer :skill_investigation
      t.integer :skill_medicine
      t.integer :skill_nature
      t.integer :skill_percepion
      t.integer :skill_performance
      t.integer :skill_persuasion
      t.integer :skill_religion
      t.integer :skill_sleight_of_hand
      t.integer :skill_stealth
      t.integer :skill_survival
      t.integer :hit_points
      t.integer :current_hit_points
      t.integer :temp_hit_points
      t.string :hit_dice
      t.integer :death_save_successes
      t.integer :death_save_failures
      t.integer :armor_class
      t.integer :initative
      t.integer :speed

      t.integer :proficiency_bonus

      t.text :personality_traits
      t.text :ideals
      t.text :bonds
      t.text :flaws
    end
  end
end
