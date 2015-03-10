class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|

      t.timestamps
      t.string :name
      t.string :player
      t.integer :level, default: 0
      #class will be a relationship to allow for level per class
      t.string :background
      t.string :race
      t.string :alignment
      t.integer :experince_points, default: 0
      #ability scores
      t.integer :ability_str, default: 8
      t.integer :ability_dex, default: 8
      t.integer :ability_con, default: 8
      t.integer :ability_int, default: 8
      t.integer :ability_wis, default: 8
      t.integer :ability_cha, default: 8
      #saving throws
      t.integer :saving_str, default: -1
      t.integer :saving_dex, default: -1
      t.integer :saving_con, default: -1
      t.integer :saving_int, default: -1
      t.integer :saving_wis, default: -1
      t.integer :saving_cha, default: -1
      #skills
      t.integer :skill_acrobatics, default: -1
      t.integer :skill_animal_handling, default: -1
      t.integer :skill_arcana, default: -1
      t.integer :skill_athletics, default: -1
      t.integer :skill_deception, default: -1
      t.integer :skill_history, default: -1
      t.integer :skill_insight, default: -1
      t.integer :skill_intimidation, default: -1
      t.integer :skill_investigation, default: -1
      t.integer :skill_medicine, default: -1
      t.integer :skill_nature, default: -1
      t.integer :skill_percepion, default: -1
      t.integer :skill_performance, default: -1
      t.integer :skill_persuasion, default: -1
      t.integer :skill_religion, default: -1
      t.integer :skill_sleight_of_hand, default: -1
      t.integer :skill_stealth, default: -1
      t.integer :skill_survival, default: -1
      t.integer :hit_points, default: -1
      t.integer :current_hit_points, default: -1
      t.integer :temp_hit_points, default: -1
      t.string :hit_dice, default: -1
      t.integer :death_save_successes, default: -1
      t.integer :death_save_failures, default: -1
      t.integer :armor_class, default: -1
      t.integer :initative, default: -1
      t.integer :speed, default: -1

      t.integer :proficiency_bonus, default: 2

      t.text :personality_traits
      t.text :ideals
      t.text :bonds
      t.text :flaws

      t.string :faction
      t.string :dci
      t.text :race_info

      t.string :classes_and_level
    end
  end
end
