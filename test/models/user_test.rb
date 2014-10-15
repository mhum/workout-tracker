require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def valid_params 
    {first_name: "Example", email: "user@example.com",
     password: "foobar", password_confirmation: "foobar"}
  end

  test "all members" do
    user = User.new valid_params
    assert_respond_to user, :first_name
    assert_respond_to user, :email
    assert_respond_to user, :password_digest
    assert_respond_to user, :password
    assert_respond_to user, :password_confirmation
    assert_respond_to user, :remember_token
    assert_respond_to user, :authenticate
  end
  
  test "model is valid" do
    user = User.new valid_params
    assert user.valid?, "#{user.errors.messages}"
  end  

  test "no first name" do   
    user = User.new valid_params
    user.first_name=nil
    assert !user.valid?, "#{user.errors.messages}"
  end
  
  test "name too long" do
    user = User.new valid_params
    user.first_name = 'a'*51
    assert !user.valid?, "#{user.errors.messages}"
  end
  
  test "no email" do
    user = User.new valid_params
    user.email = nil
    assert !user.valid?, "#{user.errors.messages}"
  end
  
  test "invalid email" do
    user = User.new valid_params
    addresses = %w[user@foo,com user_at_foo.org example.user@foo. foo@bar_baz.com foo@bar+baz.com]
    addresses.each do |invalid_address|
      user.email = invalid_address
      assert !user.valid?, "#{user.errors.messages}"
    end
  end
  
  test "valid email" do
    user = User.new valid_params
    addresses = %w[user@foo.COM A_US-ER@f.b.org frst.lst@foo.jp a+b@baz.cn]
    addresses.each do |valid_address|
      user.email = valid_address
      assert user.valid?, "#{user.errors.messages}"
    end
  end
  
  test "duplicate email" do
    user = User.new valid_params
    user.save
    new_user = User.new valid_params
    assert !new_user.save, "#{new_user.errors.messages}"
  end
  
  test "non matching password" do
    user = User.new valid_params
    user.password="password123"
    user.password_confirmation="password"
    assert !user.valid?, "#{user.errors.messages}"
  end
  
  test "short password" do
    user = User.new valid_params
    user.password="pass"
    user.password_confirmation="pass"
    assert !user.valid?, "#{user.errors.messages}"
  end
  
  test "valid password authenticates" do
    user = User.new valid_params
    user.save
    valid_user= User.find_by(email: user.email)
    assert_equal user, valid_user.authenticate(user.password)
  end
   
  test "invalid password authenticates" do
    user = User.new valid_params
    user.save
    invalid_user = User.find_by(email: user.email)
    assert_not_equal user, invalid_user.authenticate("bogus")
    assert_not invalid_user.authenticate("bogus")
  end
  
  test "create remember token" do
    user = User.new valid_params
    user.save
    assert_not_nil user.remember_token
  end
end
