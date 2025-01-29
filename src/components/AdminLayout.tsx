import React, { useState, ReactNode } from "react";
import Sidebar from "./Sidebar"
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";
interface AdminLayoutClassProps {
    children: ReactNode;
}
const AdminLayout: React.FC<AdminLayoutClassProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state:RootState) => state.auth.user);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
      };

    return (
        <>
            <nav className="navbar navbar-light bg-light p-3">
                <div className="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
                    <a className="navbar-brand" href="/admin">
                        Simple Dashboard
                    </a>
                    <button className="navbar-toggler d-md-none collapsed mb-3" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="col-12 col-md-4 col-lg-2">
                    <Form.Control
                        className="form-control-dark"
                        type="text" placeholder="Search" aria-label="Search"
                    />

                </div>
                <div className="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
                    <div className="mr-3 mt-1">
                        <a className="github-button" href="https://github.com/themesberg/simple-bootstrap-5-dashboard" data-color-scheme="no-preference: dark; light: light; dark: light;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star /themesberg/simple-bootstrap-5-dashboard">Star</a>
                    </div>
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            aria-expanded={isOpen ? 'true' : 'false'}
                            onClick={toggleDropdown}
                        >
                            {user?.name}
                        </button>
                        <ul
                            className={`dropdown-menu ${isOpen ? 'show' : ''}`}
                            aria-labelledby="dropdownMenuButton"
                        >
                            <li><Link className="dropdown-item" to="#">Settings</Link></li>
                            <li><Link className="dropdown-item" to="#">Messages</Link></li>
                            <li><Link className="dropdown-item" to="#" onClick={handleLogout}>Sign out</Link></li>

                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <main className="col-md-9 offset-md-3 col-lg-10 offset-lg-2 px-md-4 py-4">
                    {children}
                    <footer className="pt-5 d-flex justify-content-between">
    <span>Copyright © 2019-2020 <a href="https://themesberg.com">Themesberg</a></span>
    <ul className="nav m-0">
        <li className="nav-item">
            <Link className="nav-link text-secondary" to="#">Privacy Policy</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text-secondary" to="#">Terms and conditions</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link text-secondary" to="#">Contact</Link>
        </li>
    </ul>
</footer>
</main>
                </div>
            </div>
        </>
    );

};
export default AdminLayout;