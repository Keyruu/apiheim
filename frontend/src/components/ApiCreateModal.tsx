import { Button, Input, Modal, Text } from "@nextui-org/react";
import { useState } from "react";
import { SiGraphql, SiOpenai, SiOpenapiinitiative } from "react-icons/si";
import { fetchFolder } from "../app/folderSlice";
import { useAppDispatch } from "../app/hooks";

function ApiCreateModal(props: {
  visible: any;
  setVisible: any;
  folderId: number;
}) {
  const [apiName, setApiName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiType, setApiType] = useState("");

  const dispatch = useAppDispatch();

  const closeHandler = () => {
    props.setVisible(false);
  };
  const submit = () => {
    if (apiName.trim() === "" || apiUrl.trim() === "" || apiType === "") return;

    fetch("http://localhost:7000/api/v1/api/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: apiName,
        url: apiUrl,
        apiType: apiType,
        folder: {
          id: props.folderId,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        dispatch(fetchFolder());
        setApiName("");
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
          Add an&nbsp;
          <Text b size={18}>
            API
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
          value={apiName}
          onChange={(e) => setApiName(e.target.value)}
          placeholder="Name"
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder="https://petstore3.swagger.io/api/v3/openapi.json"
        />
        <div className="flex flex-row justify-center items-center">
          <div className="m-2">
            <Button
              icon={<SiOpenapiinitiative />}
              auto
              color="primary"
              ghost={apiType === "REST" ? false : true}
              onClick={() => setApiType("REST")}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Rest
            </Button>
          </div>
          <div className="m-2">
            <Button
              icon={<SiGraphql />}
              auto
              color="secondary"
              ghost={apiType === "GRAPHQL" ? false : true}
              onClick={() => setApiType("GRAPHQL")}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;GraphQL
            </Button>
          </div>
        </div>
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

export default ApiCreateModal;
