import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
            .then(response => response.json())
            .then((employeeArray) =>{
                setEmployees(employeeArray)
            })
        },
        []
    )

    return <article className="employees">
        {
            employees.map(employee => <Employee
                 key={`employee--${employee.id}`}
                 fullName={employee.fullName} 
                 mail={employee.email}
                 id={employee.id} />)
        }
    </article>
}

//     return <section className="employee" key={`employee--${employee.id}`}>
//     <div>Name: {employee.fullName}</div>
//     <div>Name: {employee.email}</div>
// </section>    