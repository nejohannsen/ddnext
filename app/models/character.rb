class Character < ActiveRecord::Base
  
  has_many :character_classes, after_add: :set_classes_and_levels, after_remove: :set_classes_and_levels
  has_many :game_classes, through: :character_classes

  before_save do
    self.set_race_info if self.race_changed?
    self.set_level if self.experince_points_changed?
  end

  before_create :set_race_info

  store :race_info

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
        responce = key.to_i if value === (amount)
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

  def remove_class_level(class_level)
    class_levels = self.character_classes.order('character_level')
    class_level = CharacterClass.find(class_level)
    character_level = class_level.character_level
    class_levels.drop(character_level).each do |cclass|
      cclass.character_level += -1
      cclass.save
    end
    self.character_classes.delete(class_level)
    class_level.destroy
  end

  private

  def set_classes_and_levels(character_class)
    character = character_class.character
    simple_hash = {}
    character.character_classes.each do |cc|
      simple_hash[cc.game_class.title] = simple_hash[cc.game_class.title].nil? ? 1 : simple_hash[cc.game_class.title] += 1
    end
    string = "(#{character.character_classes.count}) "
    simple_hash.each_with_index do |(key,value), index|
      string += (index != 1) ? "#{key} #{value}" : " / #{key} #{value}"
    end
    character.update_attribute('classes_and_levels', string)
  end
end
