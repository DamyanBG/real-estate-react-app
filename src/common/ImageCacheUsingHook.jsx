import React, { useEffect, useState } from 'react';
import { hostUrl } from '../utils/urls';
import { DBContext, useIndexedDB } from 'react-indexed-db';

const ImageCache = ({ imageUrl }) => {
    const [cachedImageUrl, setCachedImageUrl] = useState(null);

    const { getByKey, add } = useIndexedDB('images');

    useEffect(() => {
        checkCache(imageUrl);
    }, [imageUrl]);

    const checkCache = async (url) => {
        try {
            const cachedImage = await getByKey('url', url);
            if (cachedImage) {
                setCachedImageUrl(URL.createObjectURL(cachedImage.blob));
            } else {
                fetchAndCache(url);
            }
        } catch (error) {
            console.error(`Error checking image cache for ${url}`, error);
        }
    };

    const fetchAndCache = async (url) => {
        try {
            const response = await fetch(`${hostUrl}/proxy?url=${encodeURIComponent(url)}`);
            if (response.ok) {
                const blob = await response.blob();

                const cachedImage = { url, blob };

                await add(cachedImage);

                console.log(`Image cached: ${url}`);
                setCachedImageUrl(URL.createObjectURL(blob));
            } else {
                console.error('Image fetch failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching or caching image:', error);
        }
    };

    return (
        <div className="image-container">
            {cachedImageUrl ? (
                <img src={cachedImageUrl} alt="Real Estate" />
            ) : (
                <span>Loading...</span>
            )}
        </div>
    );
};

const ImageCacheWrapper = () => {
    return (
        <DBContext.Provider value={{ DBConfig: { name: 'imageCacheDB', version: 1, objectStoresMeta: [] } }}>
            <ImageCache imageUrl="your_image_url_here" />
        </DBContext.Provider>
    );
};

export default ImageCacheWrapper;
