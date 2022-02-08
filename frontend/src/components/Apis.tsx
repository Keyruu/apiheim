import { Button, Checkbox, Input, Modal, Row, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaFolderPlus } from "react-icons/fa";
import Folder from "./Folder";

function Apis() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const submit = () => {
    setVisible(false);
    console.log("folder: ", folderName);
    setFolderName("");
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:7000/api/v1/folder/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row my-2 ml-6">
        <Text color="success" h1 size={30} weight="bold">
          APIs
        </Text>
        <button className="ml-auto mr-6 text-green-500 hover:text-green-600">
          <FaFolderPlus size={30} onClick={handler} />
          <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={visible}
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
              <Button auto onClick={submit}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </button>
      </div>
      {data.map((folder: any) => (
        <Folder folder={folder} key={folder.id} />
      ))}
    </div>
  );
}

export default Apis;
