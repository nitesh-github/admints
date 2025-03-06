import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFileCsv, faHome, faUser, faUserPlus, faUsers, 
  faShop, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {

  return (
    <>
      <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky">
          <ul className="nav flex-column" id="nav_accordion">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
              <FontAwesomeIcon icon={faHome}/>
                <span className="ms-2">Dashboard</span>
              </Link>
            </li>

            <li className="nav-item has-submenu">
              <Link className="nav-link" to="#" data-bs-toggle="collapse" data-bs-target="#customerMenu">
              <FontAwesomeIcon icon={faUsers}/>
                <span className="ms-2">Customers</span>
                <FontAwesomeIcon icon={faChevronDown} className="ms-2" />
              </Link>
              <ul className="submenu collapse" id="customerMenu">
                <li><Link className="nav-link" to={`${process.env.REACT_APP_BASE_URL}/user-list`}><FontAwesomeIcon icon={faUser} /> <span className="ms-2">Users List</span></Link></li>
                <li><Link className="nav-link" to={`${process.env.REACT_APP_BASE_URL}/create-user`}> <FontAwesomeIcon icon={faUserPlus}/>
                <span className="ms-2">Create User</span></Link></li>
                <li><Link className="nav-link" to={`${process.env.REACT_APP_BASE_URL}/upload-user-csv`}> <FontAwesomeIcon icon={faFileCsv}/>
                <span className="ms-2">Upload User CSV</span></Link></li>
              </ul>
            </li>

            <li className="nav-item has-submenu">
              <Link className="nav-link" to="#" data-bs-toggle="collapse" data-bs-target="#productMenu">
              <FontAwesomeIcon icon={faShop}/>
                <span className="ms-2">Products</span>
                <FontAwesomeIcon icon={faChevronDown} className="ms-2" />
              </Link>
              <ul className="submenu collapse" id="productMenu">
                <li><Link className="nav-link" to={`${process.env.REACT_APP_BASE_URL}/products`}><FontAwesomeIcon icon={faShoppingBag} /> <span className="ms-2">Products</span></Link></li>                
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
