import CourseGoal from "./CourseGoal";
import type { CourseGoal as CourseGoalType } from "../App";
type CourseGoalListProps = {
    goals: CourseGoalType[];
    onDeleteGoal: (id: number) => void;
};

export default function CourseGoalList({
    goals,
    onDeleteGoal
}: CourseGoalListProps) {

    return (
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
    )

};