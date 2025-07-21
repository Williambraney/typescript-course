import './App.css'
import CourseGoal from './components/CourseGoal'
import Header from './components/header'
import goalsImg from './assets/goals.svg'
import { useRef, useState } from 'react';
import CourseGoalList from './components/CourseGoalList';
import NewGoal from './components/NewGoal';
import Input from './components/Input';
import Button from './components/Button';
import Container from './components/Container';
import Form, { type FormHandle } from './components/Form';

export type CourseGoal = {
  title: string;
  description: string;
  id: number;
}

function App() {

  const inputRef = useRef<HTMLInputElement>(null)

  const customFormRef = useRef<FormHandle>(null)

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

  function handleSave(data: unknown) {
    console.log('Form data saved:', data);

    const extractedData = data as {
      email: string;
      password: string;
    }

    console.log('Email:', extractedData.email);
    console.log('Password:', extractedData.password);

    customFormRef.current?.clear(); // Call the clear method on the form ref


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

      <Input
        label="Your name"
        id="name"
      />
      <Input
        label="Your age"
        id="age"
        type = "number"
        disabled = {true}
        ref = {inputRef}
      />
      <Button>
        A button
      </Button>
      <Button href ='https://google.com'>
        An anchor
      </Button>
      <Container 
        as = {Button}
        onClick={() => alert('Container Button Clicked')}
      >
        Click me
      </Container>
      <Form
        onSave = {handleSave}
        ref = {customFormRef}
      >
        <Input 
          label="Your email"
          id="email"
          type="email"
          required
        />
        <Input 
          label="Your password"
          id="password"
          type="password"
          required
        />
        <Button type="submit">
          Save
        </Button>
      </Form>
    </main>
  )
}

export default App;
