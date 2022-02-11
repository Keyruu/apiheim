import { Button, Input, Modal, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { fetchFolder } from "../../app/folderSlice";
import { useAppDispatch } from "../../app/hooks";

function FolderCreateModal(props: { visible: any; setVisible: any }) {
  const [folderName, setFolderName] = useState("");
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    props.setVisible(false);
  };
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
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
        setFolderName("");
        props.setVisible(false);
        dispatch(fetchFolder());
      });
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={props.visible}
      onClose={closeHandler}
    >
      <form onSubmit={(e) => submit(e)}>
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
          <Button type="button" auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button type="submit" auto color="success">
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default FolderCreateModal;
