import express from 'express';
import {createShortUrl,handleRedirect,getUrlStats} from '../controllers/url.js';
const router = express.Router();


router.post('/shorturls', createShortUrl)
router.get('/:shortcode', handleRedirect)
router.get('/shorturls/:shortId', getUrlStats);

export default router;