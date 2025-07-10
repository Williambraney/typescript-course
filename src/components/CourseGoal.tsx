import type { PropsWithChildren } from "react";
import type { CourseGoal as CourseGoalType } from "../App";

// type CourseGoalProps = {
//     title: string;
//     description: string;
//     id: number;
//     children: ReactNode
// };

type CourseGoalProps = PropsWithChildren<{
    title: string;
    description: string;
    id: number;
    goals : CourseGoalType[];
    onDeleteGoal: (id: number) => void;
}>;

// Can do either of the above, but using PropsWithChildren is more concise and preferred.
// PropsWithChildren automatically includes the children prop in the type definition.

export default function CourseGoal({ 
    title, 
    description,
    id,
    onDeleteGoal,
    children
}: CourseGoalProps ) {

    return (
        <article>
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>id: {id}</p>
        </div>
        <button
            onClick={() => onDeleteGoal(id)}
        >Delete</button>
        { children }
        </article>
    );

};

// const CourseGoal: FC<CourseGoalProps> = ({
//     title, 
//     description,
//     id,
//     children
// }) => {
//     return (
//         <article>
//         <div>
//             <h2>{title}</h2>
//             <p>{description}</p>
//             <p>id: {id}</p>
//         </div>
//         <button>Delete</button>
//         { children }
//         </article>
//     );
// }

// export default CourseGoal;

// Can use either of the above function component definitions.
// The first one is a regular function, the second one is a functional component using FC type.
// FC is a type that includes the children prop by default, so you don't have to define it explicitly. FC stands for Function Component.
// The FC type is a generic type that takes the props type as a parameter.