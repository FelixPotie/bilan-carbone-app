import ExportData from "../pages/ExportData";
import NotFound from "../pages/NotFound";
import SignInAdmin from "../pages/SignInAdmin";

const routes = [
    {
        path: "/admin",
        component: SignInAdmin,
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
