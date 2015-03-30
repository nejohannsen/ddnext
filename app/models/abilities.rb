class Abilities
  include MongoMapper::EmbeddedDocument
  embedded_in :character

  key :str, default: { score: 8, bonus: -1, meta: {init: 8, cost: 0, points_needed: 1, adjustments: []} }
  key :dex, default: { score: 8, bonus: -1, meta: {init: 8, cost: 0, points_needed: 1, adjustments: []} }
  key :con, default: { score: 8, bonus: -1, meta: {init: 8, cost: 0, points_needed: 1, adjustments: []} }
  key :int, default: { score: 8, bonus: -1, meta: {init: 8, cost: 0, points_needed: 1, adjustments: []} }
  key :wis, default: { score: 8, bonus: -1, meta: {init: 8, cost: 0, points_needed: 1, adjustments: []} }
  key :cha, default: { score: 8, bonus: -1, meta: {init: 8, cost: 0, points_needed: 1, adjustments: []} }
  key :meta, default: { style: 'Variant', iniatial_points: 27, point_available: 27, scores_available: [15,14,13,12,10,8], scores_used: [] }

  def self.cost_per_point
    #TODO find a better way
    [0,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2,0]

  end

  def self.point_cost
    #TODO find a better way
    [0,0,0,0,0,0,0,0,0,1,2,3,4,5,7,9,0]
  end

  def increase_by_one(ability)
    points_needed = self[ability]["meta"]["points_needed"]
    if points_needed <= self.meta['point_available'] && self[ability]["meta"]["init"] != 15
      self[ability]["meta"]["init"] += 1
      self[ability]["meta"]["cost"] += points_needed
      self[ability]["meta"]["points_needed"] = Abilities.cost_per_point[self[ability]["meta"]["init"] + 1]
      self.meta['point_available'] -= points_needed
      self.set_ability_score(ability)
    elsif points_needed > self.meta['point_available']
      self.errors.add(:str, 'Not enough points')
    elsif self[ability]["meta"]["init"] == 15
      self.errors.add(:str, '15 is the highest score you can get')
    end
  end

  def decrease_by_one(ability)
    points_to_remove = Abilities.cost_per_point[self[ability]["meta"]["init"]]
    if points_needed  <= self.meta['point_available']
      self[ability]["meta"]["init"] -= 1
      self[ability]["meta"]["cost"] -= points_to_remove
      self[ability]["meta"]["points_needed"] = points_to_remove
      self.meta['point_available'] += points_needed
      self.set_ability_score(ability)
    else
      self.errors.add(:str, '8 is the lowest score')
    end
  end

  def set_ability_score(ability)
    points_from_adjustments = 0
    self[ability]["meta"]["adjustments"].each do |adj|
      points_from_adjustments += adj.value
    end
    self[ability]["score"] = self[ability]["meta"]["init"] + points_from_adjustments
    self[ability]["bonus"] = Abilities.ability_modifier(self[ability]["score"])
    puts self[ability]
    puts self["meta"]
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
      'error'
    end
  end

end
