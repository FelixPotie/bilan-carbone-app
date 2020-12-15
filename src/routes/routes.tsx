import Ecolab from "../pages/Ecolab";
import Home from "../pages/Home";
import Mobilities from "../pages/Mobilities";
import NotFound from "../pages/NotFound";
import Privacy from "../pages/Privacy";
import SignIn from "../pages/SignIn";
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
        component: Ecolab
    },
    {
        path: "/mobilites",
        component: Mobilities
    },
    // NotFound
    {
        path: "*",
        component: NotFound
    }
]

export default routes;
