import "./App.css";
import { createTheme, Grid, NextUIProvider } from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import Header from "./components/Header";
import Apis from "./components/Apis";
import "./index.css";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import GraphiQL from "graphiql";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { useSelector } from "react-redux";
import { useAppSelector } from "./app/hooks";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#769ae7",
      secondary: "#cf99d0",
      gradient:
        "linear-gradient(45deg, var(--nextui-colors-pink300) 0%, var(--nextui-colors-blue400) 100%)",
      link: "#5E1DAD",
    },
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: "#769ae7",
      secondary: "#cf99d0",
      gradient:
        "linear-gradient(45deg, var(--nextui-colors-pink300) 0%, var(--nextui-colors-blue400) 100%)",
      background: "#1d1d1d",
    },
  },
});

function App() {
  const darkMode = useDarkMode(false);

  const api = useAppSelector((state) => state.api.value);

  return (
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <div className="">
        <Header></Header>
        <main>
          <div className="flex flex-row h-screen">
            <div className="w-1/6">
              <Apis />
            </div>
            <div className="w-full h-full">
              {api.name !== "" && (
                <div className="mx-auto w-5/6 h-5/6 my-16 overflow-y-scroll border-2">
                  {api.apiType === "REST" && <SwaggerUI url={api.url} />}
                  {api.apiType === "GRAPHQL" && (
                    <GraphiQL
                      fetcher={createGraphiQLFetcher({
                        url: api.url,
                      })}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          {/* <Grid.Container>
          <Grid xs>
            <Apis />
          </Grid>
          <Grid xs={10}>
            <div className="mx-auto w-full max-h-full overflow-hidden">
              {/* <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" /> =
              <GraphiQL
                fetcher={createGraphiQLFetcher({
                  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
                })}
              />
            </div>
          </Grid>
        </Grid.Container> */}
        </main>
      </div>
    </NextUIProvider>
  );
}

export default App;
