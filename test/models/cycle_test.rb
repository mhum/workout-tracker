require 'test_helper'

class CycleTest < ActiveSupport::TestCase
  def valid_params 
    {number: 1, user_id: 1}
  end
  
    test "all members" do
    cycle = Cycle.new valid_params
    assert_respond_to cycle, :number
    assert_respond_to cycle, :user
  end
  
  test "model is valid" do
    cycle = Cycle.new valid_params
    assert cycle.valid?, "#{cycle.errors.messages}"
  end 
  
  test "association" do
    user = User.new({first_name: "Example", email: "user@example.com",
     password: "foobar", password_confirmation: "foobar"})
    user.save
    3.times{ user.cycles.create(number: 1)}
    assert_equal 3, user.cycles.size
  end 
end
