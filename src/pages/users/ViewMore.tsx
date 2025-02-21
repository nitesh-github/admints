import React from "react";
import { Modal, Button } from "react-bootstrap";
interface User {
    id: number;
    name: string;
    email: string;
  }
  
  interface ViewMoreModalProps {
    show: boolean;
    onHide: () => void;
    user: User | null;
  }
const ViewMore = (props:ViewMoreModalProps) => {
    const user = props.user;
    return (
        <Modal show={props.show} onHide={props.onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {user ? (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </>
            ) : (
              <p>No user selected.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );

}
export default ViewMore;