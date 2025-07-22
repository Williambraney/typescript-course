import { createContext, useContext, useReducer, type ReactNode } from "react";

export type Timer = {
    name: string;
    duration: number; // Duration in seconds
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
}

const initialState: TimersState = {
    isRunning: true,
    timers: []
};

type TimersContextValue = TimersState & {
    addTimer : (timer: Timer) => void,
    startTimers: () => void,
    stopTimers: () => void
}

 const TimersContext = createContext<TimersContextValue | null>(null);

 // eslint-disable-next-line react-refresh/only-export-components
 export function useTimersContext(){
    const timersCtx = useContext(TimersContext)

    if (timersCtx === null) {
        throw new Error('useTimersContext must be used within a TimersContextProvider');
    }

    return timersCtx;
 }

type TimersContextProviderProps = {
    children: ReactNode;
}

type StartTimersAction = {
    type: 'START_TIMERS';
}

type StopTimersAction = {
    type: 'STOP_TIMERS';
}

type AddTimerAction = {
    type: 'ADD_TIMER';
    payload: Timer; // The timer to be added
}

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

function timersReducer(state: TimersState, action: Action): TimersState {

    switch (action.type) {
        case 'ADD_TIMER':
            // Logic to add a timer
            return {
                ...state,
                timers: [
                    ...state.timers, 
                    { 
                        name: action.payload.name, 
                        duration: action.payload.duration
                    }
                ] // Placeholder logic
            };
        case 'START_TIMERS':
            return {
                ...state,
                isRunning: true
            };
        case 'STOP_TIMERS':
            return {
                ...state,
                isRunning: false
            };
        default:
            return state;
    }


}

export default function TimersContextProvider({
    children
}: TimersContextProviderProps) {

    const [timersState, dispatch] = useReducer(timersReducer, initialState)

    const ctx: TimersContextValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer(timerData: Timer) {
            dispatch({ type: 'ADD_TIMER', payload: timerData});

        },
        startTimers(){

            dispatch({ type: 'START_TIMERS' });

        },
        stopTimers(){

            dispatch({ type: 'STOP_TIMERS' });

        }
    }

    return <TimersContext.Provider
        value = {ctx}
    >
        {children}
    </TimersContext.Provider>
}