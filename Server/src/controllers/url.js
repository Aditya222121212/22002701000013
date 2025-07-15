import shortid from 'shortid';
import Url from '../models/url.js';  // make sure you have correct file extension

export const createShortUrl = async (req, res) => {
    try {
        const { url, validity, shortcode } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required.' });
        }

        let shortCode = shortcode || shortid.generate();

        const existing = await Url.findOne({ shortId: shortCode });
        if (existing) {
            return res.status(409).json({ error: 'Shortcode already exists.' });
        }

        const expiryMinutes = validity || 30;
        const expiry = new Date(Date.now() + expiryMinutes * 60 * 1000);

        const result = await Url.create({
            shortId: shortCode,
            originalUrl: url,
            expiry,
            visitHistory: []
        });

        return res.status(201).json({
            shortLink: `http://localhost:5000/${shortCode}`,
            expiry: expiry.toISOString()
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const handleRedirect = async (req, res) => {
    try {
        const shortId = req.params.shortcode;

        const urlEntry = await Url.findOne({ shortId });
        if (!urlEntry) return res.status(404).json({ error: 'Shortcode not found' });

        if (urlEntry.expiry && new Date() > urlEntry.expiry) {
            return res.status(410).json({ error: 'Short URL expired' });
        }

        urlEntry.visitHistory.push({ timestamp: Date.now() });
        await urlEntry.save();

        return res.redirect(urlEntry.originalUrl);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
export const getUrlStats = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        // console.log(shortId)
        const urlEntry = await Url.findOne({ shortId });
        // console.log(urlEntry);
        if (!urlEntry) return res.status(404).json({ error: 'Shortcode not found' });

        const totalClicks = urlEntry.visitHistory.length;

        return res.status(200).json({
            totalClicks,
            originalUrl: urlEntry.originalUrl,
            createdAt: urlEntry.createdAt,
            expiry: urlEntry.expiry,
            visitHistory: urlEntry.visitHistory
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

