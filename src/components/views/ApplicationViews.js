import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
      
        if (honeyUserObject.staff) {
            // Return employee views
            return <EmployeeViews />
        }
        else {
            // Return customer service
            return <CustomerViews />
        }
}

{/* <Routes>
<Route path="/" element={
    <>
        <h1>Honey Rae Repair Shop</h1>
        <div>Your one-stop-shop to get all your electronics fixed</div>

        <Outlet />
    </>
}>

    <Route path="tickets" element={ <TicketContainer /> } 
    />
    
    <Route path="ticket/create" element={ <TicketForm /> } />
</Route>
</Routes> */}