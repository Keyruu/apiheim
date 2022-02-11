import { Button, Input, Modal, Text } from "@nextui-org/react";
import { fetchFolder } from "../../app/folderSlice";
import { useAppDispatch } from "../../app/hooks";

function FolderDeleteModal(props: {
  visible: any;
  setVisible: any;
  folder: any;
}) {
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    props.setVisible(false);
  };
  const deleteFolder = () => {
    console.log("submit");

    fetch(`http://localhost:7000/api/v1/folder/${props.folder.id}`, {
      method: "DELETE", // or 'PUT'
    }).then((response) => {
      console.log("Success:", response);
      dispatch(fetchFolder());
      props.setVisible(false);
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
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Add a&nbsp;
          <Text b size={18}>
            Folder
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text>
          Do you really want to delete the "
          <p className="font-extrabold inline">{props.folder.name}</p>" Folder?
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" auto flat color="default" onClick={closeHandler}>
          Cancel
        </Button>
        <Button type="submit" auto color="error" onClick={() => deleteFolder()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FolderDeleteModal;
