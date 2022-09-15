import { Input, Switch, Text, useTheme } from "@nextui-org/react";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import useDarkMode from "use-dark-mode";
import { fetchFolder } from "../app/folderSlice";
import { useAppDispatch } from "../app/hooks";

function Header() {
  const darkMode = useDarkMode(false);
  const { type, isDark } = useTheme();
  const dispatch = useAppDispatch();

  dispatch(fetchFolder());

  return (
    <header className="shadow-sm">
      <div className="flex items-center justify-between h-16 max-w-screen-xl px-4 mx-auto">
        <div className="flex items-center space-x-4 justify-center">
          <button className="flex">
            <Text
              h1
              size={40}
              css={{
                textGradient: "45deg, $pink300 0%, $blue400 100%",
              }}
              weight="bold"
            >
              api
            </Text>
            <Text h1 size={40}>
              heim
            </Text>
          </button>
        </div>

        <div className="flex justify-end flex-1 w-0 ">
          <Switch
            initialChecked={darkMode.value}
            size="xl"
            shadow
            iconOn={<FaMoon />}
            iconOff={<FaSun />}
            onChange={(e) => darkMode.toggle()}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
