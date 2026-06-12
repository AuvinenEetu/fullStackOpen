const Part = ({name, exercises}) => {
    return (
        <p>{name} {exercises}</p>
    )
}
const Header = ({name}) => {
    return(
        <h1>{name}</h1>
    )
}
const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}
const Total = ({parts}) => {
    const total = parts.reduce( (s, p) => {
        return s + p.exercises
    }, 0)
    return (
        <p>Total number of exercises: {total}</p>
    )
}
const Course = ({ course }) => {
    return(
        <div>
            {course.map(course =>
            <div key={course.id}>
                <Header name={course.name}/>
                <Content parts={course.parts}/>
                <Total parts={course.parts} />
            </div>
            )}
        </div>
    )
}

export default Course