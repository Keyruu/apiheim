import { Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaFolderPlus } from "react-icons/fa";
import Folder from "./Folder";

function Apis() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);

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
          <FaFolderPlus size={30} />
        </button>
      </div>
      {data.map((folder: any) => (
        <Folder folder={folder} key={folder.id} />
      ))}
    </div>
  );
}

export default Apis;
