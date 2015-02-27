class Character < ActiveRecord::Base

  def self.ability_modifier(ability_score)
    case ability_score
    when 0..1
      return -5
    when 2..3
      return -4
    when 4..5
      return -3
    when 6..7
      return -2
    when 8..9
      return -1
    when 10..11
      return 0
    when 12..13
      return 1
    when 14..15
      return 2
    when 16..17
      return 3
    when 18..19
      return 4
    when 20..21
      return 5
    else
      return 'error'
    end
  end

  def self.passive_skill(skill_value)
    return 10 + skill_value
  end

end
