import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../store/authSlice";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import axios from "axios";
const Login = () => {
    interface ErrorState {
        count: number;
        [key: string]: string | number;
    }
    const [email, setEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [errors, seterrors] = useState<ErrorState>({ count: 0 });
    const [message, setMessage] = useState({ message: "", variant: "success" });

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        if (errors?.count < 1 && email !== "" && inputPassword !== "") {
            try {
                let formdata: { email: string; password: string } = {
                    email: '',
                    password: ''
                };
                let configHeader = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                formdata.email = email;
                formdata.password = inputPassword;
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formdata, configHeader);
                setMessage({ message: "User logged in successfully", variant: "success" });
                dispatch(login(response?.data));
                navigate("/dashboard");

            } catch (error: any) {
                if (error.response) {
                    setMessage({ message: error.response.data.message, variant: "danger" });
                } else {
                    setMessage({ message: "Something went wrong!", variant: "danger" });
                }
                setShow(true);
                setLoading(false);
                return false;
            } 
        }
        else {
            setMessage({ message: "Form fields cannot be empty.", variant: "danger" });
            setShow(true);
            setLoading(false);
            return false;
        }
        setLoading(false);



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

    return (
        <React.Fragment>
            <div className="sign-in__wrapper">
                {/* Overlay */}
                <div className="sign-in__backdrop"></div>

                <Form className="shadow p-4 bg-white rounded">
                    <div className="h4 mb-2 text-center">Sign In</div>

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
                    <Form.Group className="mb-2" controlId="username">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => handleEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={inputPassword}
                            placeholder="Password"
                            onChange={(e) => handlePassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="checkbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    {!loading ? (
                        <Button
                            className="w-100"
                            variant="primary"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Log In
                        </Button>
                    ) : (
                        <Button className="w-100" variant="primary" type="button" disabled>
                            Logging In...
                        </Button>
                    )}
                    <div className="d-grid justify-content-start">
                        <Link to="#" className="text-muted px-0">Forgot password?</Link>
                    </div>
                    <div className="d-block justify-content-center">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-muted px-0">Sign up</Link>
                    </div>
                </Form>
                {/* Footer */}
                <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                    &copy;{new Date().getFullYear()} Developer | All rights reserved.
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
