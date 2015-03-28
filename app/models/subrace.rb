class Subrace
  include MongoMapper::Document

  many :to_add_features

  belongs_to :race

  before_save :set_race_title

  before_create :initalize_features

  key :title
  key :description
  key :race_title

  def update_feature(update)
  end

  private

  def initalize_features
    self.to_add_features << ToAddFeature.new(title: "", type: "", category: "", subcategory: "", value: "", requirements: [], notes: "")
  end

  def set_race_title
    self.race_title = self.race.title
  end
end
