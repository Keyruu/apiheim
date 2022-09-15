import {
  Button,
  Checkbox,
  FormElement,
  Input,
  Modal,
  Row,
  Text,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaFolderPlus, FaSearch } from "react-icons/fa";
import { set } from "../app/apiSlice";
import { collapseAll, expand } from "../app/expandedSlice";
import { fetchFolder } from "../app/folderSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Folder from "./folder/Folder";
import FolderCreateModal from "./folder/FolderCreateModal";

function ApiList() {
  const data = useAppSelector((state) => state.folder.value);
  const isLoading = useAppSelector((state) => state.folder.loading);
  const dispatch = useAppDispatch();
  const [filteredData, setFilteredData] = useState(data);
  const [bigDisplay, setBigDisplay] = useState(
    window.matchMedia("(min-width: 2000px)").matches
  );

  window
    .matchMedia("(min-width: 2000px)")
    .addEventListener("change", mediaHandler);

  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setFilteredData(getFilteredData());
  }, [search]);

  const handler = () => setVisible(true);

  function mediaHandler() {
    setBigDisplay(window.matchMedia("(min-width: 2000px)").matches);
  }

  function getFilteredData(): any {
    if (search.trim() === "") {
      dispatch(collapseAll());
      return data;
    }

    return data.filter(
      (folder: any) =>
        folder.apis.filter((api: any) => {
          if (api.name.toLowerCase().includes(search.toLowerCase())) {
            // if (api.name.toLowerCase() === search.toLowerCase()) {
            //   dispatch(set(api));
            // }
            dispatch(expand(folder.id));
            return true;
          }
          return false;
        }).length !== 0
    );
  }

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No api data</p>;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row my-2 ml-4">
        <Text h1 size={30} weight="extrabold">
          APIs
        </Text>
        {bigDisplay && (
          <div className="flex items-center justify-center mx-4 flex-1">
            <Input
              clearable
              contentRightStyling={false}
              value={search}
              placeholder="Search"
              contentRight={<FaSearch className="m-4" />}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
        <button className="ml-auto mr-6 text-green-500 hover:text-green-600">
          <FaFolderPlus size={30} onClick={handler} />
          <FolderCreateModal visible={visible} setVisible={setVisible} />
        </button>
      </div>
      {!bigDisplay && (
        <div className="flex items-center justify-center mx-4 flex-1">
          <Input
            clearable
            contentRightStyling={false}
            value={search}
            placeholder="Search"
            contentRight={<FaSearch className="m-4" />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      <div className="flex justify-center items-center"></div>
      {filteredData.map((folder: any) => (
        <Folder folder={folder} key={folder.id} />
      ))}
    </div>
  );
}

export default ApiList;
