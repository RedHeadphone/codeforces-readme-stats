import axios from 'axios';
import nunjucks from 'nunjucks';
import path from 'path';

import { get_color_from_rating, CONSTANTS, clampValue } from "../../scripts/common.js";

nunjucks.configure(path.join(process.cwd(), 'src/template'),{ autoescape: true });

export default async function handler(req, res) {
    return new Promise((resolve, reject) => {
        const {
            username,cache_seconds
        } = req.query;
        
        axios.get(`https://codeforces.com/api/user.info?handles=${username}`)
            .then(response => {
                res.setHeader("Content-Type", "image/svg+xml");

                const cacheSeconds = clampValue(
                    parseInt(cache_seconds || CONSTANTS.FOUR_HOURS, 10),
                    CONSTANTS.FOUR_HOURS,
                    CONSTANTS.ONE_DAY,
                );
            
                res.setHeader(
                    "Cache-Control",
                    `max-age=${
                        cacheSeconds / 2
                    }, s-maxage=${cacheSeconds}, stale-while-revalidate=${CONSTANTS.ONE_DAY}`,
                );

                const { rating } = response.data.result[0];
                res.send(nunjucks.render('badge.svg', { rating: rating, color: get_color_from_rating(rating) }));
                resolve();
        }).catch(error => {
            res.setHeader("Cache-Control", `no-cache, no-store, must-revalidate`);
            res.status(404).send("User not found")
            resolve();
        });
    });
}