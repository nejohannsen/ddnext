class Race
  include MongoMapper::Document
  many :subraces

  before_create :initalize_features

  key :title
  key :description
  key :features

  private
  
  def initalize_features
    self.features = []
  end

end
