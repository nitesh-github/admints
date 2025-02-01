import { Link } from "react-router-dom";
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const UploadUserCsv = () => {
    interface User{
        name: string;
        email: string;
    }
    interface ApiResponse {
        data: User[];
        message: string;
      }
    interface ErrorState {
        count: number;
        [key: string]: string | number;
    }
    const [file, setFile] = useState<File | null>(null);
        
    const [errors, seterrors] = useState<ErrorState>({ count: 0 });
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({ message: "", variant: "success" });
    const token = useSelector((state:RootState)=>state.auth.token)

    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile && selectedFile.type === "text/csv") {
          setFile(selectedFile);
          setMessage({ message: "File selected successfully!", variant: "success" });
        } else {
          setMessage({ message: "Please select a valid CSV file.", variant: "danger" });
          seterrors({
            ...errors,
            file: "Please upload a valid file",
            count: errors.count + 1,
        });
        }
      };

    const handleSubmit = async () => {
        if (!file) {
            setMessage({ message: "Please select a valid CSV file.", variant: "danger" });
            return;
          }
        setLoading(true);
        let formdata = new FormData();

        let configHeader = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        };

            formdata.append('user_csv', file);
            await axios.post<ApiResponse>(`${process.env?.REACT_APP_API_URL}/api/upload-user-csv`, formdata, configHeader)
                .then((res) => {
                    setMessage({ message: res.data.message, variant: "success" });
                    setShow(true);
                })
                .catch((error) => {
                    if (error.response) {
                        setMessage({ message: error.response.data.message, variant: "danger" });
                    } else {
                        setMessage({ message: "Something went wrong!", variant: "danger" });
                    }

                    setShow(true);
                });
            setLoading(false);
       
    };

          

    return (
        <>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Upload User CSV</li>
                </ol>
            </nav>

            <div className="row my-4">
                <div className="col-12 col-xl-12 mb-4 mb-lg-0">
                    <div className="card">
                        <h5 className="card-header">Upload User CSV</h5>
                        <div className="card-body">

                            
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

                                <Form.Group className="mb-2" controlId="name">
                                    <Form.Label>Upload CSV</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="file"
                                        placeholder="Name"
                                        onChange={handleFileChange}
                                        required
                                    />
                                    {errors?.file && (
                                        <p style={{ color: "red", marginTop: "5px" }}>{errors?.file}</p>
                                    )}
                                </Form.Group>
                                                              
                                
                                {!loading ? (
                                    <Button
                                        className="w-100"
                                        variant="primary"
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                ) : (
                                    <Button className="w-100" variant="primary" type="button" disabled>
                                        Please wait...
                                    </Button>
                                )}
                           

                        </div>
                    </div>
                </div>

            </div>
        </>
    );

}
export default UploadUserCsv;