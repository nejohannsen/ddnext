class CharacterClass < ActiveRecord::Base

  before_create :set_character_level
  belongs_to :character
  belongs_to :game_class

  validates :character, presence: true
  validates :game_class, presence: true


  def set_character_level
    if self.character_level.nil?
      num_of_entries = CharacterClass.where( character_id: self.character.id).count
      write_attribute(:character_level, num_of_entries + 1)
    end
  end
end
