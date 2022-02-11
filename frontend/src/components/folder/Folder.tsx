import { Button, Card, Text } from "@nextui-org/react";
import { useState } from "react";
import { FaAngleDown, FaAngleRight, FaPlus, FaTrash } from "react-icons/fa";
import { SiClickup } from "react-icons/si";
import { collapse, expand } from "../../app/expandedSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Api from "../api/Api";
import ApiCreateModal from "../api/ApiCreateModal";
import FolderDeleteModal from "./FolderDeleteModal";

function Folder(props: { folder: any }) {
  // const [expanded, setExpanded] = useState(false);
  const expanded = useAppSelector(
    (state) => state.expanded.expanded.indexOf(props.folder.id) !== -1
  );
  const dispatch = useAppDispatch();
  const [hover, setHover] = useState(false);
  const [apiCreateVisible, setCreateApiVisible] = useState(false);
  const [folderDeleteVisible, setFolderDeleteVisible] = useState(false);

  return (
    <div className="flex flex-col m-2 justify-center">
      <Card shadow={false}>
        <div
          className="flex flex-row items-center justify-center h-12"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <button
            className="flex items-center justify-start flex-1"
            onClick={() =>
              expanded
                ? dispatch(collapse(props.folder.id))
                : dispatch(expand(props.folder.id))
            }
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
                onClick={() => setFolderDeleteVisible(true)}
              />
              <FaPlus
                className="text-green-500 hover:text-green-700 cursor-pointer mx-4"
                size={20}
                onClick={() => setCreateApiVisible(true)}
              />
            </div>
          )}
        </div>
        <FolderDeleteModal
          visible={folderDeleteVisible}
          setVisible={setFolderDeleteVisible}
          folder={props.folder}
        />
        <ApiCreateModal
          visible={apiCreateVisible}
          setVisible={setCreateApiVisible}
          folderId={props.folder.id}
        />
        {expanded &&
          props.folder.apis.map((api: any) => (
            <div key={api.id} className="flex-row my-2">
              <Api api={api}></Api>
            </div>
          ))}
      </Card>
    </div>
  );
}

export default Folder;
