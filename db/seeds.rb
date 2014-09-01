# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
WorkoutType.create([{ title: 'Squat', sort_order:0 },{ title: 'Bench Press', sort_order:1 },
                    { title: 'Deadlift', sort_order:2 },{ title: 'Overhead Press', sort_order:3 }])