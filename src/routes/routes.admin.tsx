import AddAdmin from "../pages/admin/AddAdmin";
import ExportData from "../pages/admin/ExportData";
import ListAdmin from "../pages/admin/ListAdmin";
import NotFound from "../pages/NotFound";
import SignInAdmin from "../pages/admin/SignInAdmin";
import ListDepartment from "../pages/admin/ListDepartment";

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
        path: "/admin/list",
        component: ListAdmin
    },
    {
        path: "/admin/departments",
        component: ListDepartment
    },
    {
        path: "/admin/add",
        component: AddAdmin
    },
    {
        path: "*",
        component: NotFound
    }
]

export default routes;
