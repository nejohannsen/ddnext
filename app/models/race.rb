class Race
  include MongoMapper::Document
  many :subraces

  key :title
  key :description

end
