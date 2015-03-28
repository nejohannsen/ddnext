# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
GameClass.create([
  { title: 'Barbarian', description: "Barbarian Description" },
  { title: 'Bard', description: "Bard Description" },
  { title: 'Cleric', description: "Cleric Description" },
  { title: 'Druid', description: "Druid Description" },
  { title: 'Fighter', description: "Fighter Description" },
  { title: 'Monk', description: "Monk Description" },
  { title: 'Paladin', description: "Paladin Description" },
  { title: 'Ranger', description: "Ranger Description" },
  { title: 'Rogue', description: "Rogue Description" },
  { title: 'Sorcerer', description: "Sorcerer Description" },
  { title: 'Warlock', description: "Warlock Description" },
  { title: 'Wizard', description: "Wizard Description" }
])

dwarf = Race.create(title: 'Dwarf', description: "Dwarf Description", to_add_features: [
  ToAddFeature.new(title: "Ability Score Increase", type: 'Add', category: "Ability", subcategory: "Con", value: 2),
  ToAddFeature.new(title: "Size", type: 'Set', category: "Size", subcategory: "", value: "Medium"),
  ToAddFeature.new(title: "Speed", type: 'Set', category: "Speed", subcategory: "", value: 25),
  ToAddFeature.new(title: "Darkvision", type: 'Feature', category: "Senses", subcategory: "", value: "Dark Vision"),
  ToAddFeature.new(title: "Dwarven Resilience", type: 'Feature', category: "Resistence", subcategory: "Saving Throws", value: "Advatange against poison"),
  ToAddFeature.new(title: "Dwarven Resilience", type: 'Feature', category: "Resistence", subcategory: "Damage Resistence", value: "Resistence Damage"),
  ToAddFeature.new(title: "Dwarven Combat Training", type: 'Proficiency', category: "Weapon", subcategory: "", value: "Battleaxe"),
  ToAddFeature.new(title: "Dwarven Combat Training", type: 'Proficiency', category: "Weapon", subcategory: "", value: "Handaxe"),
  ToAddFeature.new(title: "Dwarven Combat Training", type: 'Proficiency', category: "Weapon", subcategory: "", value: "Throwing Hammer"),
  ToAddFeature.new(title: "Dwarven Combat Training", type: 'Proficiency', category: "Weapon", subcategory: "", value: "Warhammer")
])

elf = Race.create(title: 'Elf', description: "Elf Description")
halfling = Race.create(title: 'Halfling', description: "Halfling Description")
human = Race.create(title: 'Human', description: "Human Description")
dragonborn = Race.create(title: 'Dragonborn', description: "Dragonborn Description")
gnome = Race.create(title: 'Gnome', description: "Gnome Description")
halfelf = Race.create(title: 'Half-Elf', description: "Half-Elf Description")
halforc = Race.create(title: 'Half-Orc', description: "Half-Orc Description")
tiefling = Race.create(title: 'Tiefling', description: "Tiefling Description")


dwarf.subraces.create(title: 'Hill Dwarf', description: "Hill Dwarf Description", to_add_features: [
  ToAddFeature.new(title: "Ability Score Increase", type: 'Add', category: "Ability", subcategory: "Wis", value: 2),
  ToAddFeature.new(title: "Dwarven Toughness", type: 'level', category: "Hit Points", subcategory: "Max Hit Points", value: 1)
])

dwarf.subraces.create(title: 'Mountain Dwarf', description: "Mountain Dwarf Description", to_add_features: [
  ToAddFeature.new(title: "Ability Score Increase", type: 'Add', category: "Ability", subcategory: "Str", value: 2),
  ToAddFeature.new(title: "Dwarven Armor Training", type: 'Proficiency', category: "Armor", subcategory: "", value: "Light Armor"),
  ToAddFeature.new(title: "Dwarven Armor Training", type: 'Proficiency', category: "Armor", subcategory: "", value: "Medium Armor")
])


elf.subraces.create(title: 'High Elf', description: "High Elf Description")
elf.subraces.create(title: 'Moon Elf', description: "Moon Elf Description")
elf.subraces.create(title: 'Drow (Dark Elf)', description: "Drow (Dark Elf) Description")

halfling.subraces.create(title: 'Halfling', description: "Halfling Description")

human.subraces.create(title: 'Human', description: "Human Description")

dragonborn.subraces.create(title: 'Dragonborn', description: "Dragonborn Description")

gnome.subraces.create(title: 'Forest Gnome', description: "Forest Gnome Description")
gnome.subraces.create(title: 'Rock Gnome', description: "Rock Gnome Description")

halfelf.subraces.create(title: 'Half-Elf', description: "Half-Elf Description")

halforc.subraces.create(title: 'Half-Orc', description: "Half-Orc Description")

tiefling.subraces.create(title: 'Tiefling', description: "Tiefling Description")
