import { Button, Checkbox, Input, Modal, Row, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { fetchFolder } from "../app/folderSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Folder from "./folder/Folder";
import FolderCreateModal from "./folder/FolderCreateModal";

function ApiList() {
  const data = useAppSelector((state) => state.folder.value);
  const isLoading = useAppSelector((state) => state.folder.loading);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const handler = () => setVisible(true);

  useEffect(() => {
    dispatch(fetchFolder());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row my-2 ml-4">
        <Text h1 size={30} weight="extrabold">
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

export default ApiList;
