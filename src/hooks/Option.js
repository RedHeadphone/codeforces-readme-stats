import { useCallback, useState } from 'react';
import qs from 'fast-querystring';

const defaultOption = {
    username: "redheadphone",
    theme: "default",
    disable_animations: false,
    show_icons: true,
    force_username: false,    
};

const useOption = () => {
    const [options, setOptions] = useState(defaultOption);

    const getImgUrl = () => {
        return `https://codeforces-readme-stats.vercel.app/api/card?${qs.stringify(options)}`;
    };
    
    return {
        options,
        setOptions,
        getImgUrl
    };
}

export default useOption;