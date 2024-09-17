// src/BootstrapModal.js
import React from "react";
import { Form, Modal } from "react-bootstrap";

const ClsModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size={props.size}
      backdrop={"static"}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={props.handleSubmit}>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>{props?.footer}</Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ClsModal;
