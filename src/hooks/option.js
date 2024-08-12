import useLocalStorageState from "use-local-storage-state";
import qs from "fast-querystring";
import Error from "@/images/error.svg";

const defaultOption = {
  username: "redheadphone",
  theme: "github_dark",
  disable_animations: false,
  show_icons: true,
  force_username: true,
};

const useOption = () => {
  const [options, setOptions] = useLocalStorageState("options", {
    defaultValue: defaultOption,
  });
  const [querystring, setQuerystring] = useLocalStorageState("querystring", {
    defaultValue: qs.stringify(options),
  });
  const [error, setError] = useLocalStorageState("error", {
    defaultValue: false,
  });

  const getImgUrl = (query = querystring) => {
    return error ? Error.src : `/api/card?${query}`;
  };

  const updateQuerystring = (newOptions) => {
    setError(false);
    setQuerystring(qs.stringify(newOptions));
  };

  return {
    options,
    setOptions,
    getImgUrl,
    error,
    setError,
    updateQuerystring,
  };
};

export default useOption;
