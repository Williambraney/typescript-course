import type { Timer as TimerProps } from "../store/timers-context";
import Container from "./Container";

export default function Timer({
    name,
    duration
}: TimerProps ){

    return (
        <Container
            as = "article"
        >
            <h2>
                {name}
            </h2>
            <p>
                {duration} seconds
            </p>
        </Container>
    )
};