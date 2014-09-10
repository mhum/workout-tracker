# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140908223926) do

  create_table "cycles", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "number"
  end

  create_table "lifts", force: true do |t|
    t.integer  "reps_completed"
    t.integer  "workout_id"
    t.integer  "workout_lift_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.date     "completed_date"
  end

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "password_digest"
    t.string   "email"
    t.string   "remember_token"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["remember_token"], name: "index_users_on_remember_token"

  create_table "workout_lifts", force: true do |t|
    t.string  "title"
    t.float   "wu1_offset"
    t.float   "wu2_offset"
    t.float   "wu3_offset"
    t.float   "l1_offset"
    t.integer "l1_reps"
    t.float   "l2_offset"
    t.integer "l2_reps"
    t.float   "l3_offset"
    t.integer "l3_reps"
    t.integer "sort_order"
  end

  create_table "workout_lifts_types", id: false, force: true do |t|
    t.integer "workout_lift_id"
    t.integer "workout_type_id"
  end

  create_table "workout_types", force: true do |t|
    t.string  "title"
    t.boolean "active"
    t.integer "sort_order"
  end

  create_table "workouts", force: true do |t|
    t.integer  "repmax"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "cycle_id"
    t.string   "title"
    t.integer  "workout_type_id"
  end

end
