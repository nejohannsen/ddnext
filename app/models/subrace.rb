class Subrace
  include Mongoid::Document

  belongs_to :race

  field :title
  field :description
end
