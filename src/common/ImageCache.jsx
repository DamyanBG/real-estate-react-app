import { useEffect, useState } from 'react';
import { hostUrl } from '../utils/urls';

const ImageCache = ({ imageUrl }) => {
    const [cachedImageUrl, setCachedImageUrl] = useState(null);

    useEffect(() => {
        checkCache(imageUrl)
            .then((cachedUrl) => {
                if (cachedUrl) {
                    setCachedImageUrl(cachedUrl);
                } else {
                    fetchAndCache(imageUrl);
                }
            })
            .catch((error) => {
                console.error('Error checking cache:', error);
            });
    }, [imageUrl]);

    const checkCache = async (url) => {
        return new Promise((resolve, reject) => {
            const dbName = 'imageCacheDB';
            const dbVersion = 3;
            const storeName = 'images';

            const request = window.indexedDB.open(dbName, dbVersion);

            request.onerror = (event) => {
                console.error('Failed to open the database', event.target.error);
                reject(event.target.error);
            };

            request.onupgradeneeded = (event) => {
                // Save the IDBDatabase interface
                const db = event.target.result;
              
                // Create an objectStore for this database
                const objectStore = db.createObjectStore("images", { keyPath: "myKey" });
              };

            request.onsuccess = (event) => {
                try {
                    const db = event.target.result;
                    const transaction = db.transaction(storeName, 'readonly');
                    const store = transaction.objectStore(storeName);
                    const getRequest = store.get(url);

                    getRequest.onsuccess = (event) => {
                        const cachedImage = event.target.result;
                        if (cachedImage) {
                            // Cached image found, resolve with the cached URL
                            resolve(URL.createObjectURL(cachedImage));
                        } else {
                            // Image not found in cache, resolve with null
                            resolve(null);
                        }
                    };

                    getRequest.onerror = (event) => {
                        console.error(`Error checking image cache for ${url}`, event.target.error);
                        reject(event.target.error);
                    };
                } catch {
                     resolve(null);
                }
            };
        });
    };

    const fetchAndCache = async (url) => {
        try {
            const response = await fetch(`${hostUrl}/proxy?url=${encodeURIComponent(url)}`);
            if (response.ok) {
                const blob = await response.blob();

                const dbName = 'imageCacheDB';
                const dbVersion = 3;
                const storeName = 'images';

                const db = await new Promise((resolve, reject) => {
                    const request = window.indexedDB.open(dbName, dbVersion);

                    request.onerror = (event) => {
                        console.error('Failed to open the database', event.target.error);
                        reject(event.target.error);
                    };

                    request.onsuccess = (event) => {
                        resolve(event.target.result);
                    };

                    request.onupgradeneeded = (event) => {
                        const db = event.target.result;
                        if (!db.objectStoreNames.contains(storeName)) {
                            db.createObjectStore(storeName, { keyPath: 'url' });
                        }
                    };
                });

                const transaction = db.transaction(storeName, 'readwrite');
                const store = transaction.objectStore(storeName);

                const cachedImage = { url, blob };
                const request = store.put(cachedImage);

                request.onsuccess = () => {
                    console.log(`Image cached: ${url}`);
                    // Set the cached image URL to display it
                    setCachedImageUrl(URL.createObjectURL(blob));
                };

                request.onerror = (event) => {
                    console.error(`Error caching image: ${url}`, event.target.error);
                };
            } else {
                console.error('Image fetch failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching image:', error);
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

export default ImageCache;
