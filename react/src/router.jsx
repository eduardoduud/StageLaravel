import {Navigate, createBrowserRouter} from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Workflow from "./pages/Workflow";
import WorkflowForm from "./pages/WorkflowForm";
import UserForm from "./pages/UserForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/users"/>
            },
            {
                path: '/workflows',
                element: <Workflow/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"/>
            },
            {
                path: '/workflows/new',
                element: <WorkflowForm key="workflowCreate"/>
            },
            {
                path: '/workflows/:id',
                element: <WorkflowForm key="workflowUpdate"/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;