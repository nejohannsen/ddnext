class Race
  include MongoMapper::Document

  #association
  many :subraces

  #embedded Docs
  many :to_add_features

  #callbacks
  before_create :initalize_features

  #fields
  key :title
  key :description

  private

  def initalize_features
    self.to_add_features << ToAddFeature.new(title: "", type: "", category: "", subcategory: "", value: "", requirements: [], notes: "")
  end

end
