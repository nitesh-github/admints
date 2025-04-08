import { Row, Form, Col, Button, Alert } from "react-bootstrap";
//import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

interface ErrorState {
    count: number;
    [key: string]: string | number;
}

interface User {
    _id: string;
    name: string;
    email: string;
}
const Address = () => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({ message: "", variant: "success" });
    const [errors, seterrors] = useState<ErrorState>({ count: 0 });   

    return (
        <>
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
                                //value={name}
                                placeholder="Name"
                               // onChange={(e) => handleName(e.target.value)}
                                required
                            />
                            {errors?.name && (
                                <p style={{ color: "red", marginTop: "5px" }}>{errors?.name}</p>
                            )}
                        </Form.Group>
                    </Col>
                    <Col sm="6">
                        <Form.Group className="mb-2" controlId="username">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                               // value={email}
                                placeholder="Email"
                              //  onChange={(e) => handleEmail(e.target.value)}
                                required
                            />
                            {errors?.email && (
                                <p style={{ color: "red", marginTop: "5px" }}>{errors?.email}</p>
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
                                //value={inputPassword}
                                placeholder="Password"
                                //onChange={(e) => handlePassword(e.target.value)}
                                required
                            />
                            {errors?.password && (
                                <p style={{ color: "red", marginTop: "5px" }}>
                                    {errors?.password}
                                </p>
                            )}
                        </Form.Group>
                    </Col><Col>
                        
                    </Col>
                </Row>
                {!loading ? (
                    <Button
                        className="w-100"
                        variant="primary"
                        type="button"
                        //onClick={handleSubmit}
                    >
                        Next
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="button" disabled>
                        Please wait...
                    </Button>
                )}
            </Form>

        </>
    );
}
export default Address;