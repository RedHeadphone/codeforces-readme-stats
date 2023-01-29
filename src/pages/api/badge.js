import axios from 'axios';
import nunjucks from 'nunjucks';
import path from 'path';

import { get_color_from_rank } from "../../scripts/common.js";

nunjucks.configure(path.join(process.cwd(), 'src/template'),{ autoescape: true });

export default async function handler(req, res) {
    return new Promise((resolve, reject) => {
        const {
            username,
        } = req.query;
        
        axios.get(`https://codeforces.com/api/user.info?handles=${username}`)
            .then(response => {
                res.setHeader("Content-Type", "image/svg+xml");
                const { rating } = response.data.result[0];
                res.send(nunjucks.render('badge.svg', { rating: rating, color: get_color_from_rank(rating) }));
                resolve();
        }).catch(error => {
            res.status(404).send("User not found")
            resolve();
        });
    });
}