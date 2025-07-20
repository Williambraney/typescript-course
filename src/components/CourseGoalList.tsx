import CourseGoal from "./CourseGoal";
import InfoBox from "./InfoBox";
import type { CourseGoal as CourseGoalType } from "../App";
import type { ReactNode } from "react";

type CourseGoalListProps = {
    goals: CourseGoalType[];
    onDeleteGoal: (id: number) => void;
};

export default function CourseGoalList({
    goals,
    onDeleteGoal
}: CourseGoalListProps) {

    if(goals.length === 0) {

        return <InfoBox  mode="hint">
            You have no course goals yet. Start adding some!
        </InfoBox>
    }

    let warningBox: ReactNode;

    if( goals.length >= 4){
        warningBox = <InfoBox mode="warning" severity = "high">
            You have {goals.length} course goals. Consider reducing the number for better focus.
        </InfoBox>;
    }

    return (
        <>
            {warningBox}
            <ul>
                {
                    goals.map((goal: {
                        title: string;
                        description: string;
                        id: number;
                    }) => (
                        <li
                        key={goal.id}
                        >
                        <CourseGoal
                            title={goal.title}
                            description={goal.description}
                            id={goal.id}
                            goals = { goals }
                            onDeleteGoal = {onDeleteGoal}
                        >
                            <p>This is a child element for {goal.title}</p>
                        </CourseGoal>
                        </li>
                    ))
                }
            </ul>
        </>
    )

};