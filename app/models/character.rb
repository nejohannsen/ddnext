class Character
  include MongoMapper::Document

  many :character_classes

  before_save do
    self.set_race_info if self.race_changed?
    self.set_level if self.experince_points_changed?
    self.set_classes_and_levels
  end

  before_create do
    self.set_race_info
    self.intialize_abilities
  end

  timestamps!
  key :name
  key :player
  key :dci
  key :background
  key :race
  key :alignment
  key :faction
  key :race_info
  key :experince_points, default: 0
  key :level, default: 1
  key :hit_dice
  key :classes_and_levels
  key :abilities
  key :skill_acrobatics, default: -1
  key :skill_animal_handling, default: -1
  key :skill_arcana, default: -1
  key :skill_athletics, default: -1
  key :skill_deception, default: -1
  key :skill_history, default: -1
  key :skill_insight, default: -1
  key :skill_intimidation, default: -1
  key :skill_investigation, default: -1
  key :skill_medicine, default: -1
  key :skill_nature, default: -1
  key :skill_percepion, default: -1
  key :skill_performance, default: -1
  key :skill_persuasion, default: -1
  key :skill_religion, default: -1
  key :skill_sleight_of_hand, default: -1
  key :skill_stealth, default: -1
  key :skill_survival, default: -1
  key :hit_points
  key :current_hit_points
  key :temp_hit_points
  key :death_save_successes, default: -1
  key :death_save_failures, default: -1
  key :armor_class, default: 9
  key :initative, default: -1
  key :speed, default: 30
  key :proficiency_bonus, default: 2
  key :personality_traits
  key :ideals
  key :bonds, default: ''
  key :flaws

  def add_empty_array
    self.character_classes.create()
    self.character_classes.first.destroy
    self.save!
  end

  def self.get_level(amount, type)
    levels = {1 => (0..299), 2 => (300..899), 3 => (900..2699),
              4 => (2700..6499), 5 => (6500..13999), 6 => (14000..22999), 
              7 => (23000..33999), 8 => (34000..47999), 9 => (48000..63999), 
              10 => (64000..84999), 11 => (85000..99999), 12 => (100000..119999),
              13 => (120000..139999), 14 => (140000..164999), 15 => (165000..194000), 
              16 => (195000..224999), 17 => (225000..264999), 18 => (265000..304999), 
              19 =>(305000..354000), 20 => (355000..10000000000)}
    if type == 'level'
      responce = levels[amount].first
    else
      levels.each do |key,value|
        responce = key.to_i if value === (amount.to_i)
      end
    end
    return responce
  end

  def self.ability_modifier(ability_score)
    return case ability_score
    when 0..1 
       -5
    when 2..3
       -4
    when 4..5
       -3
    when 6..7
       -2
    when 8..9
       -1
    when 10..11
       0
    when 12..13
       1
    when 14..15
       2
    when 16..17
       3
    when 18..19
       4
    when 20..21
       5
    else
      return 'error'
    end
  end

  def self.passive_skill(skill_value)
    return 10 + skill_value
  end

  def intialize_abilities
    self.abilities = {
      data: [
        {title: 'str', score: 8, bonus: -1, meta: {init: 8, cost: 0, adjustments: []}},
        {title: 'dex', score: 8, bonus: -1, meta: {init: 8, cost: 0, adjustments: []}},
        {title: 'con', score: 8, bonus: -1, meta: {init: 8, cost: 0, adjustments: []}},
        {title: 'int', score: 8, bonus: -1, meta: {init: 8, cost: 0, adjustments: []}},
        {title: 'wis', score: 8, bonus: -1, meta: {init: 8, cost: 0, adjustments: []}},
        {title: 'cha', score: 8, bonus: -1, meta: {init: 8, cost: 0, adjustments: []}}
      ],
      meta: {
        style: 'Variant',
        iniatial_points: 27,
        point_available: 27,
        point_costs: {:"8" => 0, :"9" => 1, :"10" => 2, :"11" => 3, :"12" => 4, :"13" => 5, :"14" => 7, :"15" => 9},
        scores_available: [15,14,13,12,10,8],
        scores_used: []
      }
    }
  end


  def set_level
    self.level = Character.get_level(self.experince_points, "exp")
  end

  def set_race_info
    if self.race.blank?
      race_info = {
        race: {
          title: " ", description: " "},
        subrace: {
          title: " ", description: " "}
      }
    else
      subrace = Subrace.find_by_title(self.race)
      race = subrace.race
      race_info = {
        race: {
          title: race.title, description: race.description},
        subrace: {
          title: subrace.title, description: subrace.description}
      }
    end
    self.race_info = race_info
  end

  def remove_class_level(level)
    self.character_classes.delete_if {|cclass| cclass.level == level.to_i}
    self.character_classes.drop(level.to_i - 1).each do |cclass|
      cclass.level += -1
      cclass.save
    end

    if self.save
      return true
    else
      return false
    end
  end

  def set_classes_and_levels
    simple_hash = {}
    self.character_classes.each do |cc|
      simple_hash[cc.title] = simple_hash[cc.title].nil? ? 1 : simple_hash[cc.title] += 1
    end
    string = "(#{self.level})"
    simple_hash.each_with_index do |(key,value), index|
      string += (index != 1) ? "#{key} #{value}" : " / #{key} #{value}"
    end
    self.classes_and_levels = string
  end

  private

end
