import { useTimersContext } from '../store/timers-context';
import Button from './Button';

export default function TimerHeader() {

    const { isRunning, stopTimers, startTimers  } = useTimersContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button
        onClick = { isRunning ? stopTimers : startTimers }
      >{isRunning ? 'Stop' : 'Start'} Timers</Button>
    </header>
  );
}
