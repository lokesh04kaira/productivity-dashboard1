import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Circle,
  Clock,
  Target,
  Zap,
  Calendar,
  TrendingUp,
} from "lucide-react";

const ProductivityDashboard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Update resume",
      category: "job",
      completed: false,
      priority: "high",
    },
    {
      id: 2,
      text: "Apply to 3 companies",
      category: "job",
      completed: false,
      priority: "high",
    },
    {
      id: 3,
      text: "30min skill building",
      category: "development",
      completed: false,
      priority: "medium",
    },
    {
      id: 4,
      text: "Network outreach (2 people)",
      category: "job",
      completed: false,
      priority: "medium",
    },
  ]);

  const [habits, setHabits] = useState([
    { id: 1, name: "Morning routine (30min)", completed: false, streak: 0 },
    { id: 2, name: "Deep work block (2hr)", completed: false, streak: 0 },
    { id: 3, name: "Phone-free time (1hr)", completed: false, streak: 0 },
    { id: 4, name: "Plan tomorrow (10min)", completed: false, streak: 0 },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [focusMode, setFocusMode] = useState(false);
  const [focusTimer, setFocusTimer] = useState(25 * 60); // 25 minutes in seconds
  const [activeTab, setActiveTab] = useState("tasks");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (focusMode && focusTimer > 0) {
      interval = setInterval(() => {
        setFocusTimer((timer) => timer - 1);
      }, 1000);
    } else if (focusTimer === 0) {
      setFocusMode(false);
      setFocusTimer(25 * 60);
    }
    return () => clearInterval(interval);
  }, [focusMode, focusTimer]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              streak: !habit.completed
                ? habit.streak + 1
                : Math.max(0, habit.streak - 1),
            }
          : habit
      )
    );
  };

  const addTask = (text, category = "other") => {
    const newTask = {
      id: Date.now(),
      text,
      category,
      completed: false,
      priority: "medium",
    };
    setTasks([...tasks, newTask]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const completedHabits = habits.filter((habit) => habit.completed).length;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Your Productivity Command Center
        </h1>
        <p className="text-gray-600">
          Built for job hunters who want to level up their game
        </p>
        <div className="mt-4 text-sm text-gray-500">
          {currentTime.toLocaleDateString()} •{" "}
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Tasks Done</p>
              <p className="text-2xl font-bold text-gray-800">
                {completedTasks}/{tasks.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Habits</p>
              <p className="text-2xl font-bold text-gray-800">
                {completedHabits}/{habits.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Focus Score</p>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(
                  ((completedTasks + completedHabits) /
                    (tasks.length + habits.length)) *
                    100
                )}
                %
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Focus Timer</p>
              <p className="text-xl font-bold text-gray-800">
                {focusMode ? formatTime(focusTimer) : "Ready"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Focus Timer */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="mr-2" /> Pomodoro Focus Timer
        </h3>
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-mono font-bold text-gray-800">
            {formatTime(focusTimer)}
          </div>
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`px-6 py-2 rounded-lg font-semibold ${
              focusMode
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {focusMode ? "Stop" : "Start"} Focus
          </button>
          <button
            onClick={() => setFocusTimer(25 * 60)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        {focusMode && (
          <div className="mt-4 text-sm text-gray-600">
            🔥 Focus mode active! Minimize distractions and crush that task.
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 bg-white rounded-lg p-1 shadow-md">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`flex-1 py-2 px-4 rounded-md font-semibold ${
            activeTab === "tasks"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Daily Tasks
        </button>
        <button
          onClick={() => setActiveTab("habits")}
          className={`flex-1 py-2 px-4 rounded-md font-semibold ${
            activeTab === "habits"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Power Habits
        </button>
        <button
          onClick={() => setActiveTab("strategies")}
          className={`flex-1 py-2 px-4 rounded-md font-semibold ${
            activeTab === "strategies"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Anti-Procrastination
        </button>
      </div>

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="mr-2" /> Today's Mission
          </h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <button onClick={() => toggleTask(task.id)}>
                  {task.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400" />
                  )}
                </button>
                <span
                  className={`flex-1 ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.category === "job"
                      ? "bg-blue-100 text-blue-800"
                      : task.category === "development"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {task.category}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
            <strong>💡 Job Hunter Pro Tip:</strong> Batch similar tasks together
            (all applications at once, all networking in one block). Your brain
            will thank you!
          </div>
        </div>
      )}

      {/* Habits Tab */}
      {activeTab === "habits" && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2" /> Power Habits for Success
          </h3>
          <div className="space-y-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <button onClick={() => toggleHabit(habit.id)}>
                  {habit.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400" />
                  )}
                </button>
                <span
                  className={`flex-1 ${
                    habit.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {habit.name}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Streak:</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                    {habit.streak} days
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-600 bg-green-50 p-4 rounded-lg">
            <strong>🔥 Habit Stacking:</strong> Link new habits to existing
            ones. "After I brush my teeth, I'll plan my top 3 tasks for the
            day."
          </div>
        </div>
      )}

      {/* Strategies Tab */}
      {activeTab === "strategies" && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Your Anti-Procrastination Arsenal
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-800 mb-2">
                🚫 Beat Procrastination
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>
                  • Use 2-minute rule: If it takes less than 2 min, do it now
                </li>
                <li>• Break big tasks into tiny steps (15-min chunks)</li>
                <li>• Set "stupid small" goals you can't fail at</li>
                <li>• Use body doubling (work alongside someone virtually)</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">
                🎯 Laser Focus
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Phone in another room during focus blocks</li>
                <li>• Use website blockers during work time</li>
                <li>• Single-tasking only (multitasking is a myth)</li>
                <li>• Define your "one thing" each morning</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-2">
                ⏰ Time Mastery
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Time-block your calendar (including breaks)</li>
                <li>• Batch similar tasks together</li>
                <li>• Use Parkinson's Law: Set tight deadlines</li>
                <li>• Track where your time actually goes for 3 days</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-800 mb-2">
                📋 Priority Power
              </h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Use Eisenhower Matrix (urgent vs important)</li>
                <li>• Apply 80/20 rule: Focus on high-impact activities</li>
                <li>• Say no to everything that's not a priority</li>
                <li>• Review and adjust priorities weekly</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-800 mb-2">
              🎯 Job Search Specific
            </h4>
            <div className="text-sm text-yellow-700">
              <p className="mb-2">
                <strong>Morning Power Hour:</strong> Tackle 1-2 job applications
                when your energy is highest
              </p>
              <p className="mb-2">
                <strong>Afternoon Skill Building:</strong> Learn/practice
                technical skills when focus dips
              </p>
              <p>
                <strong>Evening Wind-down:</strong> Research companies, update
                LinkedIn, plan tomorrow
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-gray-500 mt-8">
        Remember: Progress over perfection. You've got this! 🚀
      </div>
    </div>
  );
};

export default ProductivityDashboard;
