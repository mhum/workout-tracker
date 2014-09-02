# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
WorkoutType.create([{ title: 'Squat', sort_order:0 },{ title: 'Bench Press', sort_order:1 },
                    { title: 'Deadlift', sort_order:2 },{ title: 'Overhead Press', sort_order:3 }])
                    
WorkoutLift.create([{title: '1', wu1_offset: 0.40, wu2_offset: 0.50, wu3_offset: 0.60,l1_offset: 0.65, 
                    l1_reps: 5, l2_offset: 0.75, l2_reps: 5, l3_offset: 0.85, l3_reps: 5, sort_order:0},
                    {title: '2', wu1_offset: 0.45, wu2_offset: 0.55, wu3_offset: 0.65,l1_offset: 0.70, 
                    l1_reps: 3, l2_offset: 0.80, l2_reps: 3, l3_offset: 0.90, l3_reps: 3, sort_order:1},
                    {title: '3', wu1_offset: 0.50, wu2_offset: 0.60, wu3_offset: 0.70,l1_offset: 0.75, 
                    l1_reps: 5, l2_offset: 0.85, l2_reps: 3, l3_offset: 0.95, l3_reps: 1, sort_order:2},
                    {title: 'D', l1_offset: 0.40, l1_reps: 5, l2_offset: 0.50, l2_reps: 5, l3_offset: 0.60, 
                      l3_reps: 5, sort_order:3}])
                      
workoutLifts = []

WorkoutLift.all.each do |workoutLift|
  workoutLifts << workoutLift
end

WorkoutType.all.each do |workoutType|
  workoutType.workout_lifts = WorkoutLift.all
end
