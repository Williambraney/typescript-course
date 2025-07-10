import './App.css'
import CourseGoal from './components/CourseGoal'
import Header from './components/header'
import goalsImg from './assets/goals.svg'
import { useState } from 'react';
import CourseGoalList from './components/CourseGoalList';
import NewGoal from './components/NewGoal';

export type CourseGoal = {
  title: string;
  description: string;
  id: number;
}

function App() {

  const [goals, setGoals] = useState<CourseGoal[]>([]);

  function handleAddGoal( goal : string, summary: string ) {

    setGoals((prevGoals) => {

      const newGoal: CourseGoal = {
        title: goal,
        description: summary,
        id: Math.random()
      };
      
      return [
        ...prevGoals,
        newGoal
      ]
    
    });

  }

  function handleDeleteGoal(id: number) {
    setGoals((prevGoals) => {
      return prevGoals.filter(goal => goal.id !== id);
    });
  }
 
  return (
    <main>
      <Header
        image = {{
          src: goalsImg,
          alt: "Goals Image"
        }}
      >
        <h1> Your course goals</h1>
      </Header>
      <NewGoal 
        onAddGoal={handleAddGoal}
      />
      <p>Click the button to add a new goal.</p>
        <CourseGoalList
          goals={goals}
          onDeleteGoal={handleDeleteGoal}
        />
    </main>
  )
}

export default App
