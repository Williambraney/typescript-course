import './App.css'
import CourseGoal from './components/CourseGoal'
import Header from './components/header'
import goalsImg from './assets/goals.svg'
import { useEffect, useRef, useState, type ReactNode } from 'react';
import CourseGoalList from './components/CourseGoalList';
import NewGoal from './components/NewGoal';
import Input from './components/Input';
import Button from './components/Button';
import Container from './components/Container';
import Form, { type FormHandle } from './components/Form';
import TimerHeader from './components/TimerHeader';
import TimersContextProvider from './store/timers-context';
import AddTimer from './components/AddTimer';
import Timers from './components/Timers';
import { get } from './utils/http';
import BlogPosts, { type BlogPost } from './components/BlogPosts';
import ErrorMessage from './components/ErrorMessage';
import CartHeader from './components/CartHeader';
import Shop from './components/Shop';
import { DUMMY_PRODUCTS } from './components/dummy-products';
import Product from './components/Product';
import { Provider } from 'react-redux';
import { store } from './store/store';
export type CourseGoal = {
  title: string;
  description: string;
  id: number;
}

type RawDataBlogPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function App() {

  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>()
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null)

  const customFormRef = useRef<FormHandle>(null)

  const [goals, setGoals] = useState<CourseGoal[]>([]);

  useEffect(() => {

    async function fetchPosts(){

      setIsFetching(true);

      try{
        
        const data = ( await get('https://jsonplaceholder.typicode.com/posts') as RawDataBlogPost[] );
  
        const blogPosts: BlogPost[] = data.map( rawPost => {
  
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body
          }
  
        });
        setFetchedPosts(blogPosts);
      } catch (error) {

        if(error instanceof Error) { // TypeScript guard to check if error is an instance of Error
          setError(error.message);
        }
      }finally {

        setIsFetching(false);
      }
      
    }
    
    fetchPosts();

  }, [])

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

  let content: ReactNode;
  
if (isFetching) {
  content = <p>Loading...</p>;
} else if (error) {
  content = <ErrorMessage text={error} />;
} else if (fetchedPosts) {
  content = <BlogPosts posts={fetchedPosts} />;
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
      <TimersContextProvider>
      <TimerHeader />
      <div>
        <AddTimer />
        <Timers />
      </div>
      </TimersContextProvider>
      <h1>Data fetching!</h1>
      {content}
          <Provider
            store = { store}
          >
      <CartHeader />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </Provider>
    </main>
  )
}

export default App;
