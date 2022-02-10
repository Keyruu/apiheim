import { Button, Checkbox, Input, Modal, Row, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { fetchFolder } from "../app/folderSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Folder from "./Folder";
import FolderCreateModal from "./FolderCreateModal";

function Apis() {
  const data = useAppSelector((state) => state.folder.value);
  const isLoading = useAppSelector((state) => state.folder.loading);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [folderName, setFolderName] = useState("");

  const closeHandler = () => {
    setVisible(false);
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
    setVisible(false);
  };

  const handler = () => setVisible(true);

  useEffect(() => {
    dispatch(fetchFolder());
  }, [dispatch]);

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
          <FolderCreateModal visible={visible} setVisible={setVisible} />
        </button>
      </div>
      {data.map((folder: any) => (
        <Folder folder={folder} key={folder.id} />
      ))}
    </div>
  );
}

export default Apis;
