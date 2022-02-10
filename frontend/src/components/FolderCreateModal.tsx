import { Button, Input, Modal, Text } from "@nextui-org/react";
import { useState } from "react";
import { fetchFolder } from "../app/folderSlice";
import { useAppDispatch } from "../app/hooks";

function FolderCreateModal(props: { visible: any; setVisible: any }) {
  const [folderName, setFolderName] = useState("");
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    props.setVisible(false);
  };
  const submit = () => {
    if (folderName.trim() === "") return;

    fetch("http://localhost:7000/api/v1/folder/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        dispatch(fetchFolder());
        setFolderName("");
      });
    props.setVisible(false);
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={props.visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Add a&nbsp;
          <Text b size={18}>
            Folder
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Name"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={closeHandler}>
          Close
        </Button>
        <Button auto color="success" onClick={submit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FolderCreateModal;
