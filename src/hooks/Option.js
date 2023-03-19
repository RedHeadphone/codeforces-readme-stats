import { useCallback, useState } from 'react';
import qs from 'fast-querystring';

import Error from "../assets/images/error.svg"

const defaultOption = {
    username: "redheadphone",
    theme: "default",
    disable_animations: false,
    show_icons: true,
    force_username: false,    
};

const useOption = () => {
    const [options, setOptions] = useState(defaultOption);
    const [querystring, setQuerystring] = useState(qs.stringify(options));
    const [error, setError] = useState(false);

    const getImgUrl = (query = querystring) => {
        return error?Error:`https://codeforces-readme-stats.vercel.app/api/card?${query}`;
    };

    const updateQuerystring = () => {
        setError(false);
        setQuerystring(qs.stringify(options));
    }
    
    return {
        options,
        setOptions,
        getImgUrl,
        setError,
        updateQuerystring
    };
}

export default useOption;