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
    t.string   "gclass_title"
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
    t.string   "dci"
    t.string   "background"
    t.string   "race"
    t.string   "alignment"
    t.string   "faction"
    t.text     "race_info"
    t.integer  "experince_points",      default: 0
    t.integer  "level",                 default: 1
    t.string   "hit_dice"
    t.string   "classes_and_levels"
    t.integer  "ability_str",           default: 8
    t.integer  "ability_dex",           default: 8
    t.integer  "ability_con",           default: 8
    t.integer  "ability_int",           default: 8
    t.integer  "ability_wis",           default: 8
    t.integer  "ability_cha",           default: 8
    t.integer  "saving_str",            default: -1
    t.integer  "saving_dex",            default: -1
    t.integer  "saving_con",            default: -1
    t.integer  "saving_int",            default: -1
    t.integer  "saving_wis",            default: -1
    t.integer  "saving_cha",            default: -1
    t.integer  "skill_acrobatics",      default: -1
    t.integer  "skill_animal_handling", default: -1
    t.integer  "skill_arcana",          default: -1
    t.integer  "skill_athletics",       default: -1
    t.integer  "skill_deception",       default: -1
    t.integer  "skill_history",         default: -1
    t.integer  "skill_insight",         default: -1
    t.integer  "skill_intimidation",    default: -1
    t.integer  "skill_investigation",   default: -1
    t.integer  "skill_medicine",        default: -1
    t.integer  "skill_nature",          default: -1
    t.integer  "skill_percepion",       default: -1
    t.integer  "skill_performance",     default: -1
    t.integer  "skill_persuasion",      default: -1
    t.integer  "skill_religion",        default: -1
    t.integer  "skill_sleight_of_hand", default: -1
    t.integer  "skill_stealth",         default: -1
    t.integer  "skill_survival",        default: -1
    t.integer  "hit_points",            default: -1
    t.integer  "current_hit_points",    default: -1
    t.integer  "temp_hit_points",       default: -1
    t.integer  "death_save_successes",  default: -1
    t.integer  "death_save_failures",   default: -1
    t.integer  "armor_class",           default: -1
    t.integer  "initative",             default: -1
    t.integer  "speed",                 default: -1
    t.integer  "proficiency_bonus",     default: 2
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
