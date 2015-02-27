# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150227040956) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "character_classes", force: true do |t|
    t.integer  "character_id"
    t.integer  "game_class_id"
    t.integer  "character_level"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "character_classes", ["character_id"], name: "index_character_classes_on_character_id", using: :btree
  add_index "character_classes", ["game_class_id"], name: "index_character_classes_on_game_class_id", using: :btree

  create_table "characters", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "player"
    t.integer  "level"
    t.string   "background"
    t.string   "race"
    t.string   "alignment"
    t.integer  "experince_points"
    t.integer  "ability_str"
    t.integer  "ability_dex"
    t.integer  "ability_con"
    t.integer  "ability_int"
    t.integer  "ability_wis"
    t.integer  "ability_cha"
    t.integer  "saving_str"
    t.integer  "saving_dex"
    t.integer  "saving_con"
    t.integer  "saving_int"
    t.integer  "saving_wis"
    t.integer  "saving_cha"
    t.integer  "skill_acrobatics"
    t.integer  "skill_animal_handling"
    t.integer  "skill_arcana"
    t.integer  "skill_athletics"
    t.integer  "skill_deception"
    t.integer  "skill_history"
    t.integer  "skill_insight"
    t.integer  "skill_intimidation"
    t.integer  "skill_investigation"
    t.integer  "skill_medicine"
    t.integer  "skill_nature"
    t.integer  "skill_percepion"
    t.integer  "skill_performance"
    t.integer  "skill_persuasion"
    t.integer  "skill_religion"
    t.integer  "skill_sleight_of_hand"
    t.integer  "skill_stealth"
    t.integer  "skill_survival"
    t.integer  "hit_points"
    t.integer  "current_hit_points"
    t.integer  "temp_hit_points"
    t.string   "hit_dice"
    t.integer  "death_save_successes"
    t.integer  "death_save_failures"
    t.integer  "armor_class"
    t.integer  "initative"
    t.integer  "speed"
    t.integer  "proficiency_bonus"
    t.text     "personality_traits"
    t.text     "ideals"
    t.text     "bonds"
    t.text     "flaws"
  end

  create_table "game_classes", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "races", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "subraces", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "race_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "subraces", ["race_id"], name: "index_subraces_on_race_id", using: :btree

end
