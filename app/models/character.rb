class Character < ActiveRecord::Base
  
  has_many :character_classes, after_add: :set_classes_and_levels
  has_many :game_classes, through: :character_classes

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

  private

  def set_classes_and_levels(character_class)
    character = character_class.character
    simple_hash = {}
    character.character_classes.each do |cc|
      simple_hash[cc.game_class.title] = simple_hash[cc.game_class.title].nil? ? 1 : simple_hash[cc.game_class.title] += 1
    end
    string = ""
    simple_hash.each do |key,value|
      string +=  string.blank? ? "#{key} #{value}" : " / #{key} #{value}"
    end
    character.update_attribute('classes_and_levels', string)
  end

end
