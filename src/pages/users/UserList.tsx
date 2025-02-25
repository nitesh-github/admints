import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ViewMore from "./ViewMore";
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface ApiResponse {
  data: User[];
}

const UserList = () => {
  const [resdata, setData] = useState<User[]>([]);  // For storing fetched data
  const [error, setError] = useState<string | null>();
  const token = useSelector((state: RootState) => state.auth.token);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);


  const getUserList = useCallback(async () => {
    const configHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    };
    if (!token) {
      setError("Token is missing");
      return;
    }
    try {
      const response = await axios.get<ApiResponse>(`${process.env.REACT_APP_API_URL}/api/get-user-list`, configHeaders);
      setData(response?.data?.data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }, [token]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const handleViewMore = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  }

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
              <Table>
                <thead>
                  <tr><th>SNo</th><th>Name</th><th>Email</th><th>Registration Date</th><th>View More</th></tr>
                </thead>
                <tbody>
                  {(!error && resdata?.length) ? (resdata?.map((row, i) => {
                    return <tr key={row.id}><td>{i + 1}</td><td>{row?.name}</td><td>{row?.email}</td><td>{row?.createdAt}</td><td><Button variant="primary" onClick={() => handleViewMore(row)}>View More</Button></td></tr>
                  })) : (<><tr><td>No data or Something went wrong!</td></tr></>)}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        {/* View More Modal */}
        <ViewMore
          show={showModal}
          onHide={() => setShowModal(false)}
          user={selectedUser}
        />
      </div>

    </>
  );
};
export default UserList;