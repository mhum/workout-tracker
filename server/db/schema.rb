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

ActiveRecord::Schema.define(version: 20170201034735) do

  create_table "cycles", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "number"
  end

  create_table "lifts", force: :cascade do |t|
    t.integer  "reps_completed"
    t.integer  "workout_id"
    t.integer  "workout_lift_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.date     "completed_date"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "password_digest"
    t.string   "email"
    t.string   "remember_token"
    t.integer  "weight"
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["remember_token"], name: "index_users_on_remember_token"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "workout_lifts", force: :cascade do |t|
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

  create_table "workout_lifts_types", id: false, force: :cascade do |t|
    t.integer "workout_lift_id"
    t.integer "workout_type_id"
  end

  create_table "workout_types", force: :cascade do |t|
    t.string  "title"
    t.boolean "active"
    t.integer "sort_order"
    t.integer "weight_increase"
  end

  create_table "workouts", force: :cascade do |t|
    t.integer  "repmax"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "cycle_id"
    t.integer  "workout_type_id"
  end

end
