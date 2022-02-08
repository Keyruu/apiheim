import { Button } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";
import { SiGraphql, SiOpenapiinitiative } from "react-icons/si";

function Api(props: { api: any }) {
  return (
    <div className="flex justify-center items-center m-2 mb-4">
      {
        <Button
          shadow
          icon={
            props.api.apiType === "GRAPHQL" ? (
              <SiGraphql />
            ) : (
              <SiOpenapiinitiative />
            )
          }
          color={props.api.apiType === "GRAPHQL" ? "secondary" : "primary"}
          ghost
          animated
        >
          {props.api.name}
        </Button>
      }
      <button className="text-red-700 hover:text-red-900">
        <FaTrash className="m-2" />
      </button>
    </div>
  );
}

export default Api;
