'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlusCircle, Check, X, ChevronDown, ChevronUp, Activity, Calendar, Dumbbell, Clock } from 'lucide-react';

// Mock data for initial workouts
const initialWorkouts = {
    "Workout 1": {
        "Day 1": [
            { id: 1, name: "Squat", sets: 3, reps: 8, weight: 60, rest: 90, instructions: "Keep your back straight and go below parallel", imageUrl: "/api/placeholder/400/300" },
            { id: 2, name: "Bench Press", sets: 3, reps: 8, weight: 45, rest: 90, instructions: "Retract your shoulder blades and keep elbows at 45°", imageUrl: "/api/placeholder/400/300" },
            { id: 3, name: "Bent Over Row", sets: 3, reps: 10, weight: 40, rest: 60, instructions: "Keep your back flat and pull to your lower chest", imageUrl: "/api/placeholder/400/300" }
        ],
        "Day 2": [
            { id: 4, name: "Deadlift", sets: 3, reps: 6, weight: 80, rest: 120, instructions: "Engage your lats and push through your heels", imageUrl: "/api/placeholder/400/300" },
            { id: 5, name: "Overhead Press", sets: 3, reps: 8, weight: 30, rest: 90, instructions: "Keep your core tight and press directly overhead", imageUrl: "/api/placeholder/400/300" },
            { id: 6, name: "Pull-ups", sets: 3, reps: 8, weight: 0, rest: 90, instructions: "Use full range of motion and control the descent", imageUrl: "/api/placeholder/400/300" }
        ],
        "Day 3": [
            { id: 7, name: "Front Squat", sets: 3, reps: 8, weight: 50, rest: 90, instructions: "Keep elbows high and maintain an upright torso", imageUrl: "/api/placeholder/400/300" },
            { id: 8, name: "Incline Press", sets: 3, reps: 10, weight: 40, rest: 60, instructions: "Set bench to 30-45° incline and press evenly", imageUrl: "/api/placeholder/400/300" },
            { id: 9, name: "Lat Pulldown", sets: 3, reps: 10, weight: 45, rest: 60, instructions: "Pull the bar to your upper chest with elbows pointing down", imageUrl: "/api/placeholder/400/300" }
        ],
        "Day 4": [
            { id: 10, name: "Romanian Deadlift", sets: 3, reps: 8, weight: 60, rest: 90, instructions: "Feel the stretch in hamstrings and maintain neutral spine", imageUrl: "/api/placeholder/400/300" },
            { id: 11, name: "Dips", sets: 3, reps: 8, weight: 0, rest: 90, instructions: "Keep shoulders down and elbows at your sides", imageUrl: "/api/placeholder/400/300" },
            { id: 12, name: "Face Pulls", sets: 3, reps: 12, weight: 20, rest: 60, instructions: "Pull toward your face with external rotation", imageUrl: "/api/placeholder/400/300" }
        ]
    },
    "Workout 2": {
        "Day 1": [
            { id: 13, name: "Bulgarian Split Squat", sets: 3, reps: 10, weight: 20, rest: 60, instructions: "Keep front shin vertical and torso upright", imageUrl: "/api/placeholder/400/300" },
            { id: 14, name: "Push-ups", sets: 3, reps: 15, weight: 0, rest: 60, instructions: "Maintain straight body alignment throughout", imageUrl: "/api/placeholder/400/300" },
            { id: 15, name: "Inverted Row", sets: 3, reps: 12, weight: 0, rest: 60, instructions: "Pull chest to bar and keep body straight", imageUrl: "/api/placeholder/400/300" }
        ],
        "Day 2": [
            { id: 16, name: "Kettlebell Swing", sets: 3, reps: 15, weight: 16, rest: 60, instructions: "Hinge at hips and snap forcefully", imageUrl: "/api/placeholder/400/300" },
            { id: 17, name: "Landmine Press", sets: 3, reps: 10, weight: 25, rest: 60, instructions: "Press in an arcing motion with core engaged", imageUrl: "/api/placeholder/400/300" },
            { id: 18, name: "TRX Row", sets: 3, reps: 12, weight: 0, rest: 60, instructions: "Adjust angle for appropriate difficulty", imageUrl: "/api/placeholder/400/300" }
        ],
        "Day 3": [
            { id: 19, name: "Goblet Squat", sets: 3, reps: 12, weight: 20, rest: 60, instructions: "Hold weight close to chest and sit between heels", imageUrl: "/api/placeholder/400/300" },
            { id: 20, name: "Floor Press", sets: 3, reps: 12, weight: 35, rest: 60, instructions: "Keep elbows at 45° and touch triceps to floor", imageUrl: "/api/placeholder/400/300" },
            { id: 21, name: "Dumbbell Row", sets: 3, reps: 12, weight: 25, rest: 60, instructions: "Support with one arm and pull dumbbell to hip", imageUrl: "/api/placeholder/400/300" }
        ],
        "Day 4": [
            { id: 22, name: "Lunges", sets: 3, reps: 10, weight: 30, rest: 60, instructions: "Step forward with vertical shin and controlled descent", imageUrl: "/api/placeholder/400/300" },
            { id: 23, name: "Arnold Press", sets: 3, reps: 10, weight: 15, rest: 60, instructions: "Start with palms facing you and rotate as you press", imageUrl: "/api/placeholder/400/300" },
            { id: 24, name: "Pull-up Negatives", sets: 3, reps: 5, weight: 0, rest: 90, instructions: "Jump to top position and lower slowly for 5 seconds", imageUrl: "/api/placeholder/400/300" }
        ]
    }
};

// Mock data for exercise history
const generateHistory = (exercise) => {
    const today = new Date();
    const history = [];

    for (let i = 0; i < 10; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i * 3);
        history.push({
            date: date.toISOString().split('T')[0],
            weight: exercise.weight - Math.floor(Math.random() * 5) + Math.floor(Math.random() * 5)
        });
    }

    return history.reverse();
};

export default function WorkoutTracker() {
    const [workouts, setWorkouts] = useState(() => {
        // Try to load from localStorage on initial render
        const savedWorkouts = typeof window !== 'undefined' ? localStorage.getItem('workouts') : null;
        return savedWorkouts ? JSON.parse(savedWorkouts) : initialWorkouts;
    });

    const [selectedWorkout, setSelectedWorkout] = useState("Workout 1");
    const [selectedDay, setSelectedDay] = useState("Day 1");
    const [weightUnit, setWeightUnit] = useState("kg");
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [exerciseHistory, setExerciseHistory] = useState({});

    // Form state for adding new exercise
    const [newExercise, setNewExercise] = useState({
        name: "",
        sets: 3,
        reps: 10,
        weight: 20,
        rest: 60,
        instructions: "",
        imageUrl: "/api/placeholder/400/300"
    });

    // Load exercise history from localStorage on component mount
    useEffect(() => {
        const savedHistory = typeof window !== 'undefined' ? localStorage.getItem('exerciseHistory') : null;

        if (savedHistory) {
            setExerciseHistory(JSON.parse(savedHistory));
        } else {
            // Generate mock history for each exercise if none exists
            const history = {};
            Object.keys(workouts).forEach(workout => {
                Object.keys(workouts[workout]).forEach(day => {
                    workouts[workout][day].forEach(exercise => {
                        history[exercise.id] = generateHistory(exercise);
                    });
                });
            });
            setExerciseHistory(history);
            localStorage.setItem('exerciseHistory', JSON.stringify(history));
        }
    }, []);

    // Save workouts to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('workouts', JSON.stringify(workouts));
        }
    }, [workouts]);

    // Save exercise history to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined' && Object.keys(exerciseHistory).length > 0) {
            localStorage.setItem('exerciseHistory', JSON.stringify(exerciseHistory));
        }
    }, [exerciseHistory]);

    const handleWeightChange = (exerciseId, newWeight) => {
        const updatedWorkouts = JSON.parse(JSON.stringify(workouts));

        // Find and update the exercise
        Object.keys(updatedWorkouts).forEach(workout => {
            Object.keys(updatedWorkouts[workout]).forEach(day => {
                updatedWorkouts[workout][day] = updatedWorkouts[workout][day].map(ex => {
                    if (ex.id === exerciseId) {
                        return { ...ex, weight: newWeight };
                    }
                    return ex;
                });
            });
        });

        setWorkouts(updatedWorkouts);

        // Update history with new entry
        const today = new Date().toISOString().split('T')[0];

        setExerciseHistory(prevHistory => {
            const updatedHistory = { ...prevHistory };

            if (!updatedHistory[exerciseId]) {
                updatedHistory[exerciseId] = [];
            }

            // Check if we already have an entry for today
            const todayIndex = updatedHistory[exerciseId].findIndex(entry => entry.date === today);

            if (todayIndex >= 0) {
                // Update today's entry
                updatedHistory[exerciseId][todayIndex].weight = newWeight;
            } else {
                // Add new entry for today
                updatedHistory[exerciseId].push({ date: today, weight: newWeight });
            }

            return updatedHistory;
        });
    };

    const handleAddExercise = () => {
        if (!newExercise.name) return;

        const updatedWorkouts = JSON.parse(JSON.stringify(workouts));

        // Generate new ID by finding the maximum existing ID and adding 1
        let maxId = 0;
        Object.keys(workouts).forEach(workout => {
            Object.keys(workouts[workout]).forEach(day => {
                workouts[workout][day].forEach(ex => {
                    if (ex.id > maxId) maxId = ex.id;
                });
            });
        });

        const newExerciseWithId = {
            ...newExercise,
            id: maxId + 1
        };

        updatedWorkouts[selectedWorkout][selectedDay].push(newExerciseWithId);
        setWorkouts(updatedWorkouts);

        // Initialize history for the new exercise
        setExerciseHistory(prevHistory => ({
            ...prevHistory,
            [newExerciseWithId.id]: generateHistory(newExerciseWithId)
        }));

        // Reset form and hide it
        setNewExercise({
            name: "",
            sets: 3,
            reps: 10,
            weight: 20,
            rest: 60,
            instructions: "",
            imageUrl: "/api/placeholder/400/300"
        });
        setShowAddExercise(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <header className="bg-blue-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold flex items-center">
                        <Dumbbell className="mr-2" /> Workout Tracker
                    </h1>
                    <div className="flex items-center">
                        <select
                            value={weightUnit}
                            onChange={(e) => setWeightUnit(e.target.value)}
                            className="bg-blue-700 text-white px-3 py-1 rounded-md text-sm ml-2"
                        >
                            <option value="kg">KG</option>
                            <option value="lbs">LBS</option>
                        </select>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                <div className="mb-6 bg-white rounded-lg shadow p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Workout Program</label>
                            <div className="flex gap-2">
                                {Object.keys(workouts).map(workout => (
                                    <button
                                        key={workout}
                                        onClick={() => setSelectedWorkout(workout)}
                                        className={`flex-1 px-4 py-2 rounded-md ${selectedWorkout === workout
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        {workout}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Workout Day</label>
                            <div className="flex gap-2 flex-wrap">
                                {workouts[selectedWorkout] && Object.keys(workouts[selectedWorkout]).map(day => (
                                    <button
                                        key={day}
                                        onClick={() => setSelectedDay(day)}
                                        className={`px-4 py-2 rounded-md ${selectedDay === day
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-medium flex items-center">
                            <Calendar className="mr-2 text-blue-600" />
                            {selectedWorkout} - {selectedDay}
                        </h2>
                        <button
                            onClick={() => setShowAddExercise(!showAddExercise)}
                            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center"
                        >
                            <PlusCircle className="mr-1 h-4 w-4" /> Add Exercise
                        </button>
                    </div>

                    {/* Add Exercise Form */}
                    {showAddExercise && (
                        <div className="p-4 border-b border-gray-200 bg-blue-50">
                            <h3 className="text-md font-medium mb-3">Add New Exercise</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Name</label>
                                    <input
                                        type="text"
                                        value={newExercise.name}
                                        onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                                        className="w-full rounded-md border border-gray-300 p-2"
                                        placeholder="e.g. Bench Press"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Sets</label>
                                        <input
                                            type="number"
                                            value={newExercise.sets}
                                            onChange={(e) => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) })}
                                            className="w-full rounded-md border border-gray-300 p-2"
                                            min="1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Reps</label>
                                        <input
                                            type="number"
                                            value={newExercise.reps}
                                            onChange={(e) => setNewExercise({ ...newExercise, reps: parseInt(e.target.value) })}
                                            className="w-full rounded-md border border-gray-300 p-2"
                                            min="1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rest (sec)</label>
                                        <input
                                            type="number"
                                            value={newExercise.rest}
                                            onChange={(e) => setNewExercise({ ...newExercise, rest: parseInt(e.target.value) })}
                                            className="w-full rounded-md border border-gray-300 p-2"
                                            min="0"
                                            step="5"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight ({weightUnit})</label>
                                    <input
                                        type="number"
                                        value={newExercise.weight}
                                        onChange={(e) => setNewExercise({ ...newExercise, weight: parseFloat(e.target.value) })}
                                        className="w-full rounded-md border border-gray-300 p-2"
                                        min="0"
                                        step="0.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                                    <textarea
                                        value={newExercise.instructions}
                                        onChange={(e) => setNewExercise({ ...newExercise, instructions: e.target.value })}
                                        className="w-full rounded-md border border-gray-300 p-2"
                                        rows="2"
                                        placeholder="Brief instructions for proper form..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    onClick={() => setShowAddExercise(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddExercise}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add Exercise
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Exercise List */}
                    <ul className="divide-y divide-gray-200">
                        {workouts[selectedWorkout] && workouts[selectedWorkout][selectedDay] &&
                            workouts[selectedWorkout][selectedDay].map(exercise => (
                                <li key={exercise.id} className="p-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-lg">{exercise.name}</h3>
                                            <div className="flex items-center text-sm text-gray-600 mt-1 space-x-4">
                                                <span className="flex items-center">
                                                    <span className="font-semibold">{exercise.sets}</span> sets × <span className="font-semibold">{exercise.reps}</span> reps
                                                </span>
                                                <span className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    <span className="font-semibold">{exercise.rest}s</span> rest
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-3 md:mt-0 flex items-center">
                                            <div className="mr-4">
                                                <label className="block text-xs text-gray-500 mb-1">Weight ({weightUnit})</label>
                                                <div className="flex items-center">
                                                    <button
                                                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l-md"
                                                        onClick={() => handleWeightChange(exercise.id, Math.max(0, exercise.weight - (weightUnit === 'kg' ? 2.5 : 5)))}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={exercise.weight}
                                                        onChange={(e) => handleWeightChange(exercise.id, parseFloat(e.target.value))}
                                                        className="w-16 h-8 text-center border-t border-b border-gray-300"
                                                        min="0"
                                                        step={weightUnit === 'kg' ? 2.5 : 5}
                                                    />
                                                    <button
                                                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r-md"
                                                        onClick={() => handleWeightChange(exercise.id, exercise.weight + (weightUnit === 'kg' ? 2.5 : 5))}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setSelectedExercise(selectedExercise === exercise.id ? null : exercise.id)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                            >
                                                {selectedExercise === exercise.id ? <ChevronUp /> : <ChevronDown />}
                                            </button>
                                        </div>
                                    </div>

                                    {selectedExercise === exercise.id && (
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                {exercise.imageUrl && (
                                                    <div className="mb-3">
                                                        <img
                                                            src={exercise.imageUrl}
                                                            alt={exercise.name}
                                                            className="rounded-lg w-full h-48 object-cover"
                                                        />
                                                    </div>
                                                )}

                                                <div className="bg-gray-50 p-3 rounded-md">
                                                    <h4 className="font-medium text-sm mb-2">Instructions:</h4>
                                                    <p className="text-sm text-gray-700">{exercise.instructions}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-medium text-sm mb-2 flex items-center">
                                                    <Activity className="h-4 w-4 mr-1 text-blue-600" />
                                                    Progress Graph
                                                </h4>
                                                <div className="bg-gray-50 p-3 rounded-md h-64">
                                                    {exerciseHistory[exercise.id] && (
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <BarChart data={exerciseHistory[exercise.id]}>
                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                <XAxis
                                                                    dataKey="date"
                                                                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                                />
                                                                <YAxis
                                                                    domain={['dataMin - 5', 'dataMax + 5']}
                                                                    label={{ value: `Weight (${weightUnit})`, angle: -90, position: 'insideLeft' }}
                                                                />
                                                                <Tooltip
                                                                    formatter={(value) => [`${value} ${weightUnit}`, 'Weight']}
                                                                    labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                                                                        weekday: 'short',
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: 'numeric'
                                                                    })}
                                                                />
                                                                <Bar dataKey="weight" fill="#3b82f6" />
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
            </main>

            <footer className="mt-12 py-6 border-t border-gray-200">
                <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                    Personal Workout Tracker © {new Date().getFullYear()}
                </div>
            </footer>
        </div>
    );
}