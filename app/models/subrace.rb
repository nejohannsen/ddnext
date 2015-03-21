class Subrace
  include MongoMapper::Document

  belongs_to :race

  key :title
  key :description
end
