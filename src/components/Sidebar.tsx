import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Collapse } from 'bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const Sidebar: React.FC = () => {
  useEffect(() => {
    // Handle click event for submenu toggling
    const handleSidebarClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      const parentEl = element.closest('.nav-item') as HTMLElement;
      const nextEl = parentEl?.querySelector('.submenu') as HTMLElement;

      if (nextEl && nextEl.classList.contains("submenu")) {
        e.preventDefault();
        const myCollapse = new Collapse(nextEl);

        if (nextEl.classList.contains("show")) {
          myCollapse.hide();
        } else {
          myCollapse.show();

          // Find other submenus with class 'show' and close them
          const openedSubmenu = document.querySelector(".submenu.show");
          if (openedSubmenu && openedSubmenu !== nextEl) {
            new Collapse(openedSubmenu).hide();
          }
        }
      }
    };

    // Attach event listeners after component mounts
    const sidebarLinks = document.querySelectorAll(".sidebar .nav-link");
    sidebarLinks.forEach((element) => {
      element.addEventListener("click", handleSidebarClick as EventListener);
    });

    // Cleanup event listeners when the component is unmounted
    return () => {
      sidebarLinks.forEach((element) => {
        element.removeEventListener("click", handleSidebarClick as EventListener);
      });
    };
  }, []);

  return (
    <>
      <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky">
          <ul className="nav flex-column" id="nav_accordion">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/admin">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <span className="ml-2">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item has-submenu">
              <Link className="nav-link" to="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span className="ml-2">Customers</span>
              </Link>
              <ul className="submenu collapse">
                <li><Link className="nav-link" to="#"><FontAwesomeIcon icon={faUser} />Users List</Link></li>
                <li><Link className="nav-link" to="#">Submenu item 2</Link></li>
                <li><Link className="nav-link" to="#">Submenu item 3</Link></li>
              </ul>
            </li>

            <li className="nav-item has-submenu">
              <Link className="nav-link" to="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                <span className="ml-2">Orders</span>
              </Link>
              <ul className="submenu collapse">
                <li><Link className="nav-link" to="#">Submenu item 1</Link></li>
                <li><Link className="nav-link" to="#">Submenu item 2</Link></li>
                <li><Link className="nav-link" to="#">Submenu item 3</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#">
                <i className="fa fa-cog" aria-hidden="true"></i>
                <span className="ml-2">Settings</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                <span className="ml-2">Integrations</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
