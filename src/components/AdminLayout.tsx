import React, { useState, ReactNode } from "react";
import Sidebar from "./Sidebar"
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
interface AdminLayoutClassProps {
    children: ReactNode;
}
const AdminLayout: React.FC<AdminLayoutClassProps> = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
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
                            Nitesh Testing Name
                        </button>
                        <ul
                            className={`dropdown-menu ${isOpen ? 'show' : ''}`}
                            aria-labelledby="dropdownMenuButton"
                        >
                            <li><Link className="dropdown-item" to="#">Settings</Link></li>
                            <li><Link className="dropdown-item" to="#">Messages</Link></li>
                            <li><Link className="dropdown-item" to="#">Sign out</Link></li>
                            
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">



                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Overview</li>
                            </ol>
                        </nav>
                        <h1 className="h2">Dashboard</h1>
                        <p>This is the homepage of a simple admin interface which is part of a tutorial written on Themesberg</p>
                        <div className="row my-4">
                            <div className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
                                <div className="card">
                                    <h5 className="card-header">Customers</h5>
                                    <div className="card-body">
                                        <h5 className="card-title">345k</h5>
                                        <p className="card-text">Feb 1 - Apr 1, United States</p>
                                        <p className="card-text text-success">18.2% increase since last month</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                                <div className="card">
                                    <h5 className="card-header">Revenue</h5>
                                    <div className="card-body">
                                        <h5 className="card-title">$2.4k</h5>
                                        <p className="card-text">Feb 1 - Apr 1, United States</p>
                                        <p className="card-text text-success">4.6% increase since last month</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                                <div className="card">
                                    <h5 className="card-header">Purchases</h5>
                                    <div className="card-body">
                                        <h5 className="card-title">43</h5>
                                        <p className="card-text">Feb 1 - Apr 1, United States</p>
                                        <p className="card-text text-danger">2.6% decrease since last month</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
                                <div className="card">
                                    <h5 className="card-header">Traffic</h5>
                                    <div className="card-body">
                                        <h5 className="card-title">64k</h5>
                                        <p className="card-text">Feb 1 - Apr 1, United States</p>
                                        <p className="card-text text-success">2.5% increase since last month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-lg-0">
                                <div className="card">
                                    <h5 className="card-header">Latest transactions</h5>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Order</th>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Customer</th>
                                                        <th scope="col">Total</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">17371705</th>
                                                        <td>Volt Premium Bootstrap 5 Dashboard</td>
                                                        <td>johndoe@gmail.com</td>
                                                        <td>€61.11</td>
                                                        <td>Aug 31 2020</td>
                                                        <td><Link to="">View</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">17370540</th>
                                                        <td>Pixel Pro Premium Bootstrap UI Kit</td>
                                                        <td>jacob.monroe@company.com</td>
                                                        <td>$153.11</td>
                                                        <td>Aug 28 2020</td>
                                                        <td><Link to="">View</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">17371705</th>
                                                        <td>Volt Premium Bootstrap 5 Dashboard</td>
                                                        <td>johndoe@gmail.com</td>
                                                        <td>€61.11</td>
                                                        <td>Aug 31 2020</td>
                                                        <td><Link to="">View</Link></td>
                                                    </tr>
                                                    
                                                   
                                                    <tr>
                                                        <th scope="row">17370540</th>
                                                        <td>Pixel Pro Premium Bootstrap UI Kit</td>
                                                        <td>jacob.monroe@company.com</td>
                                                        <td>$153.11</td>
                                                        <td>Aug 28 2020</td>
                                                        <td><Link to="">View</Link></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-4">
                                <div className="card">
                                    <h5 className="card-header">Traffic last 6 months</h5>
                                    <div className="card-body">
                                        <div id="traffic-chart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

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