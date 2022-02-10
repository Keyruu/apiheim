import { Button, Text } from "@nextui-org/react";
import { useState } from "react";
import {
  FaAngleDown,
  FaAngleRight,
  FaArrowRight,
  FaFolderPlus,
  FaGreaterThan,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import folderSlice from "../app/folderSlice";
import Api from "./Api";
import ApiCreateModal from "./ApiCreateModal";

function Folder(props: { folder: any }) {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  const handler = () => setVisible(true);

  return (
    <div className="flex flex-col border border-slate-300 rounded-lg m-2 justify-center">
      <div
        className="flex flex-row items-center justify-center h-12"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <button
          className="flex items-center justify-start flex-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <FaAngleDown size={15} className="ml-4" />
          ) : (
            <FaAngleRight size={15} className="ml-4" />
          )}
          <Text size={20} weight="bold" margin="0 0 0 8px">
            {props.folder.name}
          </Text>
        </button>
        {hover && (
          <div className="flex flex-row justify-center items-center">
            <FaTrash
              className="text-red-600 hover:text-red-700 cursor-pointer mx-2"
              size={20}
            />
            <FaPlus
              className="text-green-500 hover:text-green-700 cursor-pointer mx-4"
              size={20}
              onClick={() => setVisible(true)}
            />
          </div>
        )}
      </div>
      <ApiCreateModal
        visible={visible}
        setVisible={setVisible}
        folderId={props.folder.id}
      />
      {expanded &&
        props.folder.apis.map((api: any) => (
          <div key={api.id} className="flex-row">
            <Api api={api}></Api>
          </div>
        ))}
    </div>
  );
}

export default Folder;
