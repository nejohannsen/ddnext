class Race
  include Mongoid::Document
  has_many :subraces

  field :title
  field :description

end
