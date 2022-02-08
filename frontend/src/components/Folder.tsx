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
import Api from "./Api";

function Folder(props: { folder: any }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col border border-slate-300 rounded-lg m-2">
      <div className="flex flex-row items-center justify-start">
        <button
          className="flex items-center justify-start mr-auto"
          onClick={(_) => setExpanded(!expanded)}
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
        <FaTrash className="text-red-600 hover:text-red-700" size={20} />
        <Button
          auto
          size="lg"
          light
          color="success"
          className="hover:text-green-600"
          icon={<FaPlus />}
        />
      </div>

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
