class CharacterClass
  include MongoMapper::EmbeddedDocument

  embedded_in :character

  before_save :set_character_level

  key :title
  key :level

  validates :character, presence: true

  def set_character_level
    if self.level.nil?
      num_of_entries = self.character.character_classes.count
      write_attribute(:level, num_of_entries)
    end
  end

  def allowed_levels
    errors.add :level, "You need more experince" if (self.character.character_classes.count >= (Character.get_level(self.character.experince_points, 'exp')))
  end



end
