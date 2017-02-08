class Cycle < ApplicationRecord
  belongs_to :user
  has_many :workouts, dependent: :destroy

  def as_json(options={})
    super(:except => [:created_at, :updated_at],
          :include => {
            :workouts => {
              :except => [:created_at, :updated_at],
              :include => {
                :workout_type => {
                  :except => [:active, :sort_order]
                },
                :lifts => {
                  :except => [:created_at, :updated_at],
                  :include => {
                    :workout_lift => {
                      :except => [:sort_order]
                    }
                  }
                }
              }
            }
          }
    )
  end
end
