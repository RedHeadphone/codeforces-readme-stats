import { useState } from "react";
import qs from "fast-querystring";
import Error from "@/images/error.svg";

const defaultOption = {
  username: "redheadphone",
  theme: "default",
  disable_animations: false,
  show_icons: true,
  force_username: true,
};

const useOption = () => {
  const [options, setOptions] = useState(defaultOption);
  const [querystring, setQuerystring] = useState(qs.stringify(options));
  const [error, setError] = useState(false);

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
