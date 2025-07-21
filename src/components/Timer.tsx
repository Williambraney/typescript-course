import { useEffect, useRef, useState } from "react";
import { useTimersContext, type Timer as TimerProps } from "../store/timers-context";
import Container from "./Container";

export default function Timer({
    name,
    duration
}: TimerProps ){

    const interval = useRef<number | null>(null)

    const { isRunning } = useTimersContext();

    const [remainingTime, setRemainingTime] = useState(duration * 1000); // Convert seconds to milliseconds

    if(remainingTime <= 0 && interval.current ) {
        clearInterval(interval.current);
    }

    useEffect(() => {

        let timer: number;

        if(isRunning){

        timer = setInterval(function(){
            setRemainingTime(prev => {

                if(prev <= 0) {
                    return prev;
                }
                return prev - 50;
        }); // Decrease remaining time by 50 milliseconds
        }, 50);
        interval.current = timer;

    }else if (interval.current) {
        clearInterval(interval.current);
    }
        return () => clearInterval(timer); // Clear the interval on component unmount
    }, [isRunning]);

    const formattedRemainingTime = (remainingTime / 1000).toFixed(2); // Convert milliseconds back to seconds

    return (
        <Container
            as = "article"
        >
            <h2>
                {name}
            </h2>
            <p><progress max = {duration * 1000} value = {remainingTime} /></p>
            <p>
                {formattedRemainingTime} seconds
            </p>
        </Container>
    )
};