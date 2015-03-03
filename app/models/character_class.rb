class CharacterClass < ActiveRecord::Base

  before_create :set_character_level
  belongs_to :character
  belongs_to :game_class

  validates :character, presence: true
  validates :game_class, presence: true

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
end
