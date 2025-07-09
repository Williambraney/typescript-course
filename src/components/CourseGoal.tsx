type CourseGoalProps = {
    title: string;
    description: string;
    id: number;
};

export default function CourseGoal({ 
    title, 
    description,
    id
}: CourseGoalProps ) {
    return (
        <article>
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>id: {id}</p>
        </div>
        <button>Delete</button>
        </article>
    );

};