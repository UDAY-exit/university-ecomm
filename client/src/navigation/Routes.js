
import Contact from "../container/contact/Contact";
import Support from "../container/support/Support";
import About from "../container/about/About";
import Register from "../container/register/Register";
import Login from "../container/login/Login";
import UniversityAdmin from "../container/admin/university/UniversityAdmin";
import DepartmentAdmin from "../container/admin/department/DepartmentAdmin";
import ProductAdmin from "../container/admin/product/ProductAdmin";
import Home from "../container/user/home/Home";
import DepartmentUser from "../container/user/department/DepartmentUser";
import ProductUser from "../container/user/product/ProductUser";
import ProductDetail from "../container/user/productDetail/ProductDetail";

const ROUTES = {
    about: {
        name: "/about",
        component: <About />
    },
    contact: {
        name: "/contact",
        component: <Contact />
    },
    support: {
        name: "/support",
        component: <Support />
    },
    register: {
        name: "/register",
        component: <Register />
    },
    login: {
        name: "/login",
        component: <Login />
    },
    universityAdmin: {
        name: "/universityAdmin",
        component: <UniversityAdmin />
    },
    departmentAdmin: {
        name: "/departmentAdmin",
        component: <DepartmentAdmin />
    },
    productAdmin: {
        name: "/productAdmin",
        component: <ProductAdmin />
    },
    home: {
        name: "/home",
        component: <Home />
    },
    departmentUser: {
        name: "/departmentUser",
        component: <DepartmentUser />
    },
    productUser: {
        name: "/productUser",
        component: <ProductUser />
    },
    productDetail: {
        name: "/productDetail",
        component: <ProductDetail />
    }
};

export default ROUTES;
