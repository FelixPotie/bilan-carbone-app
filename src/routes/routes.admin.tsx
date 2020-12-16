import ExportData from "../pages/ExportData";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";

const routes = [
    {
        path: "/admin",
        component: SignIn,
    },
    {
        path: "/admin/export-data",
        component: ExportData
    },
    {
        path: "*",
        component: NotFound
    }
]

export default routes;
