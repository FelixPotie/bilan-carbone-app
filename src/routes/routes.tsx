import AddMobility from "../pages/AddMobility";
import Home from "../pages/Home";
import Mobilities from "../pages/Mobilities";
import NotFound from "../pages/NotFound";
import Privacy from "../pages/Privacy";
import SignIn from "../pages/SignIn";
import Statistics from "../pages/Statistics";
import Simulation from "../pages/Simulation";
import Terms from "../pages/Terms";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/signin",
        component: SignIn
    },
    {
        path: "/home",
        component: Home
    },
   
    {
        path: "/privacy",
        component: Privacy
    },
    {
        path: "/terms",
        component: Terms
    },
    {
        path: "/simulation",
        component: Simulation
    },
    {
        path: "/mobilites",
        component: Mobilities
    },
    {
        path: "/add-mobility",
        component: AddMobility
    },
    {
        path: "/statistics",
        component: Statistics
    },
    // NotFound
    {
        path: "*",
        component: NotFound
    }
]

export default routes;
