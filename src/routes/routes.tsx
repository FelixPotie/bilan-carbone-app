import AddJourney from "../pages/AddJourney";
import AddMobility from "../pages/AddMobility";
import Ecolab from "../pages/Ecolab";
import Home from "../pages/Home";
import Mobilities from "../pages/Mobilities";
import NotFound from "../pages/NotFound";
import Privacy from "../pages/Privacy";
import SignIn from "../pages/SignIn";
import SimulationPage from "../pages/SimulationPage";
import Statistics from "../pages/Statistics";
import Terms from "../pages/Terms";
import UpdateJourney from "../pages/UpdateJourney";

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
        component: SimulationPage
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
        path: "/:id/add-journey",
        component: AddJourney
    },
    {
        path: "/:id/update-journey/:journeyid",
        component: UpdateJourney
    },
    {
        path: "/statistics",
        component: Statistics
    },
    {
        path: "/ecolab",
        component: Ecolab
    },
    // NotFound
    {
        path: "*",
        component: NotFound
    }
]

export default routes;
