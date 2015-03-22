class Subrace
  include MongoMapper::Document

  belongs_to :race

  before_save :set_race_title

  before_create :initalize_features

  key :title
  key :description
  key :features
  key :race_title

  private

  def initalize_features
    self.features = []
  end

  def set_race_title
    self.race_title = self.race.title
  end
end
