class Race
  include MongoMapper::Document
  has_many :subraces

  key :title
  key :description

end
