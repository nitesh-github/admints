import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import Address from "../Address";
const CreateUser = () => {
  interface ErrorState {
    count: number;
    [key: string]: string | number;
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [cnfpassword, setCnfpassword] = useState("");
  const [errors, seterrors] = useState<ErrorState>({ count: 0 });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({ message: "", variant: "success" });
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const { id } = useParams();
  const [showAddress, setShowAddress] = useState(false);

  interface User {
    _id: string;
    name: string;
    email: string;
  }

  const handleSubmit = async () => {
    setLoading(true);
    let formdata: { name: string; email: string; password: string } = {
      name: "",
      email: "",
      password: "",
    };

    let configHeader = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (
      errors?.count < 1 &&
      name !== "" &&
      email !== "" &&
      inputPassword !== ""
    ) {
      formdata.name = name;
      formdata.email = email;
      formdata.password = inputPassword;
      await axios
        .post(
          `${process.env?.REACT_APP_API_URL}/api/register`,
          formdata,
          configHeader
        )
        .then((res) => {
          setMessage({
            message: "User registered successfully",
            variant: "success",
          });
          setShow(true);
        })
        .catch((error) => {
          if (error.response) {
            setMessage({
              message: error.response.data.message,
              variant: "danger",
            });
          } else {
            setMessage({ message: "Something went wrong!", variant: "danger" });
          }

          setShow(true);
        });
      setLoading(false);
    } else {
      setMessage({
        message: "Form fields cannot be empty.",
        variant: "danger",
      });
      setShow(true);
      setLoading(false);
      return false;
    }
    setLoading(false);
  };

  const handleName = (param: string) => {
    setName(param);
    if (!param) {
      seterrors({
        ...errors,
        name: "Name cannot be blank.",
        count: errors.count + 1,
      });
    } else {
      seterrors({ ...errors, name: "", count: errors.count - 1 });
    }
  };
  const handleEmail = (param: string) => {
    setEmail(param);
    if (!param) {
      seterrors({
        ...errors,
        email: "Email cannot be blank.",
        count: errors.count + 1,
      });
    } else {
      seterrors({ ...errors, email: "", count: errors.count - 1 });
    }
  };
  const handlePassword = (param: string) => {
    setInputPassword(param);
    if (!param) {
      seterrors({
        ...errors,
        password: "Confirm password cannot be blank.",
        count: errors.count + 1,
      });
    } else {
      seterrors({ ...errors, password: "", count: errors.count - 1 });
    }
  };

  const handleCnfPassword = (param: string) => {
    setCnfpassword(param);
    if (!param) {
      seterrors({
        ...errors,
        cnfpassword: "Confirm password cannot be blank.",
        count: errors.count + 1,
      });
    } else if (param !== inputPassword) {
      seterrors({
        ...errors,
        cnfpassword: "Password and Confirm password should be same!",
        count: errors.count + 1,
      });
    } else {
      seterrors({ ...errors, cnfpassword: "", count: errors.count - 1 });
    }
  };

  useEffect(() => {
    if (selectedUser?._id) {
      setName(selectedUser?.name || "");
      setEmail(selectedUser?.email || "");
    } else if (id) {
      const getUser = async () => {
        const configHeaders = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        if (!token) {
          setMessage({ message: "Token is missing", variant: "danger" });
          return;
        }
        const res = await axios.get<{ user: User }>(
          `${process.env?.REACT_APP_API_URL}/api/get-user/${id}`,
          configHeaders
        );
        setEmail(res?.data?.user?.email);
        setName(res?.data?.user?.name);
      };
      getUser();
    }
  }, [selectedUser, id, token]);

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
            <h5 className="card-header">Create User</h5>
            <div className="card-body">
              {!setShowAddress ? (
                <Form className="shadow p-4 bg-white rounded">
                  {show ? (
                    <Alert
                      className="mb-2"
                      variant={message.variant}
                      onClose={() => setShow(false)}
                      dismissible
                    >
                      {message.message}
                    </Alert>
                  ) : (
                    <div />
                  )}
                  <Row>
                    <Col sm="6">
                      <Form.Group className="mb-2" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
                          placeholder="Name"
                          onChange={(e) => handleName(e.target.value)}
                          required
                        />
                        {errors?.name && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {errors?.name}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group className="mb-2" controlId="username">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          placeholder="Email"
                          onChange={(e) => handleEmail(e.target.value)}
                          required
                        />
                        {errors?.email && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {errors?.email}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <Form.Group className="mb-2" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={inputPassword}
                          placeholder="Password"
                          onChange={(e) => handlePassword(e.target.value)}
                          required
                        />
                        {errors?.password && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {errors?.password}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-2" controlId="cnfpassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={cnfpassword}
                          placeholder="Confirm Password"
                          onChange={(e) => handleCnfPassword(e.target.value)}
                          required
                        />
                        {errors?.cnfpassword && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {errors?.cnfpassword}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  {!loading ? (
                    <Button
                      className="w-100"
                      variant="primary"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      className="w-100"
                      variant="primary"
                      type="button"
                      disabled
                    >
                      Please wait...
                    </Button>
                  )}
                </Form>
              ) : (
                <>
                  <Address />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateUser;
