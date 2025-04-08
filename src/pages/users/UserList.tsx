import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ViewMore from "./ViewMore";
import ReactPaginate from "react-paginate";
import { format } from "date-fns";
import { setSelectedUserRedux } from "../../store/usersSlice";
interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface ApiData {
  users: User[];
  totalCount: number;
}
interface ApiResponse {
  data: ApiData;
}

const UserList = () => {
  const [resdata, setData] = useState<User[]>([]); // For storing fetched data
  const [error, setError] = useState<string | null>();
  const token = useSelector((state: RootState) => state.auth.token);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageClick = (event: { selected: number }) =>
    setCurrentPage(event.selected);
  const getUserList = useCallback(async () => {
    const configHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    if (!token) {
      setError("Token is missing");
      return;
    }
    try {
      const page = currentPage + 1;
      const response = await axios.get<ApiResponse>(
        `${process.env.REACT_APP_API_URL}/api/get-user-list?page=${page}&limit=10`,
        configHeaders
      );
      setData(response?.data?.data?.users);
      let totalPageCount = Math.ceil(response?.data?.data?.totalCount / 10);
      setpageCount(totalPageCount);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }, [token, currentPage]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const handleViewMore = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleEdit = (user: User) => {
    dispatch(setSelectedUserRedux(user));
    navigate(`/edit-user/${user?._id}`);
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Overview
          </li>
        </ol>
      </nav>

      <div className="row my-4">
        <div className="col-12 col-xl-12 mb-4 mb-lg-0">
          <div className="card">
            <h5 className="card-header">User List</h5>
            <div className="card-body">
              <Table>
                <thead>
                  <tr>
                    <th>SNo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!error && resdata?.length ? (
                    resdata?.map((row, i) => {
                      return (
                        <tr key={row._id}>
                          <td>{i + 1}</td>
                          <td>{row?.name}</td>
                          <td>{row?.email}</td>
                          <td>{format(row?.createdAt, "dd MMM yyyy")}</td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => handleViewMore(row)}
                            >
                              View More
                            </Button>
                            <Button
                              className="ms-2"
                              variant="primary"
                              onClick={() => handleEdit(row)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td>No data or Something went wrong!</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
              <ReactPaginate
                previousLabel={"«"}
                nextLabel={"»"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center mt-3"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
              />
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