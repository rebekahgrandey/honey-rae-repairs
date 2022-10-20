import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"

export const TicketList = ( {searchTermState} ) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    useEffect(
        () => {
        const searchedTickets = tickets.filter(ticket => {
            return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())})
        setFiltered(searchedTickets)
    }, [ searchTermState ])
    
    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
               setFiltered(tickets) 
            }
        },
        [emergency]
    )

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
            if (honeyUserObject.staff){
                setFiltered(tickets)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        }, [tickets]
    )
    //~ Ternary statement can easily display or hide components depending on state (employee or not)
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
            : ""
    }
        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => {
                        return <section className="ticket" key={ticket.id}>
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "❗️" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}