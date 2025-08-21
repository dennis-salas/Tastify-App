import { Navigate, useRoutes } from "react-router"
import { PublicLayout } from "./public/PublicLayout"
import { Login } from "../pages/authentication/Login"
import { Register } from "../pages/authentication/Register"
import { PrivateLayout } from "./private/PrivateLayout"
import { Dashboard } from "../pages/dashboard/Dashboard"
import { Tasks } from "../pages/tasks/Tasks"
import { Calendar } from "../pages/calendar/Calendar"


export const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <PublicLayout/>,
      children: [
        {index: true, element: <Navigate to='/register' replace />},
        {path: 'login', element: <Login/>},
        {path: 'register', element: <Register/>}
      ]
    },
    {
      path: '/app',
      element:<PrivateLayout/>,
      children: [
        {path: 'dashboard', element: <Dashboard/>},
        {path: 'task', element: <Tasks/>},
        {path: 'calendar', element: <Calendar/>},
      ]
    }
  ])
  return (
    routes
  )
}
