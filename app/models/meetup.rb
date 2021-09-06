class Meetup < ApplicationRecord
  serialize :guests, JSON

  def guests=(guests)
    super( guests.select(&:present?).map(&:strip) )
  end
end
