import { Button, Card, Text } from "@nextui-org/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { SiGraphql, SiOpenapiinitiative } from "react-icons/si";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import apiSlice, { set } from "../app/apiSlice";

function Api(props: { api: any }) {
  const currentApi = useAppSelector((state) => state.api.value);
  const [hover, setHover] = useState(false);
  const dispatch = useAppDispatch();

  function getColor() {
    switch (props.api.apiType) {
      case "REST":
        return "primary";
      case "GRAPHQL":
        return "secondary";
    }
  }

  function getTextColor() {
    return currentApi.id === props.api.id ? "" : getColor();
  }

  function deleteApi(event: React.MouseEvent<SVGElement, MouseEvent>) {
    event.stopPropagation();
    event.currentTarget.blur();
    console.log("delete");
  }

  return (
    <div className="flex justify-center items-center m-2 mb-4">
      <Card
        bordered
        hoverable
        clickable
        color={currentApi.id !== props.api.id ? "default" : getColor()}
        onClick={() => dispatch(set(props.api))}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center">
          <div className="justify-self-start">
            {props.api.apiType === "GRAPHQL" && (
              <Text color={getTextColor()}>
                <SiGraphql />
              </Text>
            )}
            {props.api.apiType === "REST" && (
              <Text color={getTextColor()}>
                <SiOpenapiinitiative />
              </Text>
            )}
          </div>
          <div className="ml-2 justify-self-center">
            <Text weight="bold" color={getTextColor()}>
              {props.api.name}
            </Text>
          </div>
          {hover && (
            <div className="text-red-600 ml-auto hover:text-red-700 cursor-pointer">
              <FaTrash onClick={deleteApi} />
            </div>
          )}
        </div>
      </Card>
      {/* <Button
        shadow
        icon={
          props.api.apiType === "GRAPHQL" ? (
            <SiGraphql />
          ) : (
            <SiOpenapiinitiative />
          )
        }
        color={props.api.apiType === "GRAPHQL" ? "secondary" : "primary"}
        ghost={currentApi.id !== props.api.id}
        css={{ textTransform: "none" }}
        animated
        onClick={() => dispatch(set(props.api))}
      >
        {props.api.name}
      </Button>
      <button className="text-red-700 hover:text-red-900">
        <FaTrash className="m-2" />
      </button> */}
    </div>
  );
}

export default Api;
