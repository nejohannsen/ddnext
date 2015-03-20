class CharacterClass
  include Mongoid::Document

  before_save :set_character_level
  embedded_in :character


  field :title
  field :character_level

  validates :character, presence: true

  def set_character_level
    if self.character_level.nil?
      num_of_entries = self.character.character_classes.count
      write_attribute(:character_level, num_of_entries)
    end
  end

  def allowed_levels
    errors.add :character_level, "You need more experince" if (self.character.character_classes.count >= (Character.get_level(self.character.experince_points, 'exp')))
  end



end
