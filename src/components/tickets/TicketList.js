import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    //~ Function component (referred to as React’s render phase)
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)

                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            // TODO ask about line below
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency] //function will only fire when [emergency changes]
    )


    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        }, [tickets]
    )

    useEffect(
        () => {
            if (openOnly){
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )

    //~ Ternary statement can easily display or hide components depending on state
    return <>
        {
            honeyUserObject.staff
                ? <>
                    <button
                        onClick={
                            () => {
                                setEmergency(true)
                            }
                        }
                    >Emergency Only</button>
                    <button
                        onClick={
                            () => {
                                setEmergency(false)
                            }
                        }
                    >Show All</button>
                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>View Open Tickets</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }
        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                //TODO ask about below line
                filteredTickets.map(
                    (ticket) => {
                        return <section className="ticket">
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "❗️" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}