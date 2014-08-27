class User < ActiveRecord::Base
  has_many :cycles, dependent: :destroy
end
