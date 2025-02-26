import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export function useTheme() {
  const [theme, setTheme] = useLocalStorageState("theme", {
    defaultValue: "light",
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return { theme, setTheme };
}
