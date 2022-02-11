import { Button, Input, Modal, Text } from "@nextui-org/react";
import { set } from "../../app/apiSlice";
import { fetchFolder } from "../../app/folderSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function ApiDeleteModal(props: { visible: any; setVisible: any; api: any }) {
  const dispatch = useAppDispatch();
  const currentApi = useAppSelector((state) => state.api.value);

  const closeHandler = () => {
    props.setVisible(false);
  };
  const deleteApi = () => {
    console.log("delete");

    fetch(`http://localhost:7000/api/v1/api/${props.api.id}`, {
      method: "DELETE", // or 'PUT'
    }).then((response) => {
      console.log("Success:", response);
      if (currentApi.id === props.api.id) {
        dispatch(set({ id: 0, name: "", url: "", apiType: "" }));
        props.setVisible(false);
      }
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
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Delete an&nbsp;
          <Text b size={18}>
            API
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text>
          Do you really want to delete the "
          <p className="font-extrabold inline">{props.api.name}</p>" API?
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" auto flat color="default" onClick={closeHandler}>
          Cancel
        </Button>
        <Button type="submit" auto color="error" onClick={() => deleteApi()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ApiDeleteModal;
