class CharacterClass < ActiveRecord::Base

  before_create :set_character_level
  belongs_to :character
  belongs_to :game_class

  validates :character, presence: true
  validates :game_class, presence: true

  validate :allowed_levels

  after_validation :set_gclass_title

  def set_character_level
    if self.character_level.nil?
      num_of_entries = CharacterClass.where( character_id: self.character.id).count
      write_attribute(:character_level, num_of_entries + 1)
    end
  end

  def set_gclass_title
    write_attribute(:gclass_title, self.game_class.title)
  end

  def allowed_levels
    debugger
    errors.add :character_level, "You need more experince" if (self.character.character_classes.count >= (Character.get_level(self.character.experince_points, 'exp')))
  end


end
