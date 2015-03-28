class ToAddFeature
  include MongoMapper::EmbeddedDocument

  key :type
  key :where
  key :what
  key :value
  key :requirments
  key :notes

end
