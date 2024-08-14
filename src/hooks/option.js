import useLocalStorageState from "use-local-storage-state";
import qs from "fast-querystring";

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
  const [imageUrl, setImageUrl] = useLocalStorageState("imageUrl", {
    defaultValue: qs.stringify(options),
  });
  const [error, setError] = useLocalStorageState("error", {
    defaultValue: false,
  });
  const [loading, setLoading] = useLocalStorageState("loading", {
    defaultValue: true,
  });

  const updateImage = (newOptions) => {
    const newImageUrl = `/api/card?${qs.stringify(newOptions)}`;
    if (newImageUrl != imageUrl || error) setLoading(true);
    setError(false);
    setImageUrl(newImageUrl);
  };

  const checkHandleNotFound = () => {
    return new Promise((resolve) => {
      fetch(
        `https://codeforces.com/api/user.info?handles=${options.username}`
      ).then((res) => {
        if (res.status === 400) {
          resolve();
        }
      });
    });
  };

  return {
    options,
    setOptions,
    imageUrl,
    updateImage,
    error,
    setError,
    loading,
    setLoading,
    checkHandleNotFound,
  };
};

export default useOption;
