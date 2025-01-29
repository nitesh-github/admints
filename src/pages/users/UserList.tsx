import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";



const UserList = () =>{
    
    
    
return (
    <>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Overview</li>
        </ol>
      </nav>
      
     
      <div className="row my-4">
        <div className="col-12 col-xl-12 mb-4 mb-lg-0">
          <div className="card">
            <h5 className="card-header">User List</h5>
            <div className="card-body">
              <h5 className="card-title">345k</h5>
             
     
              <p className="card-text">Feb 1 - Apr 1, United States</p>
              <p className="card-text text-success">18.2% increase since last month</p>
            </div>
          </div>
        </div>
        
      </div>
      
    </>
);
};
export default UserList;