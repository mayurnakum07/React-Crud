import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

function Usecontex({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDarkTable, setIsDarkTable] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((e) => !e);
  };

  const toggleDarkTable = () => {
    setIsDarkTable((e) => !e);
  };

  return (
    <div>
      <DarkModeContext.Provider
        value={{ isDarkTable, isDarkMode, toggleDarkMode, toggleDarkTable }}
      >
        {children}
      </DarkModeContext.Provider>
    </div>
  );
}

export default Usecontex;
