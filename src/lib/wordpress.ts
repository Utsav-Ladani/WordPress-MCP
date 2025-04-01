export const getHeaders = () => {
    const wordpressAPIUsername = process.env.WORDPRESS_API_USERNAME;
    const wordpressAPIPassword = process.env.WORDPRESS_API_PASSWORD;
    
    if (!wordpressAPIUsername || !wordpressAPIPassword) {
        throw new Error('WordPress API credentials are missing');
    }

    const authString = Buffer
        .from(`${wordpressAPIUsername}:${wordpressAPIPassword}`)
        .toString('base64');

    return {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
    }
}

export const getWordPressHostURL = () => {
    const wordpressHostURL = process.env.WORDPRESS_HOST_URL;

    if (!wordpressHostURL) {
        throw new Error('WordPress host URL is not set');
    }

    return wordpressHostURL;
}

export const getWordPressPostAuthorId = () => {
    const wordpressPostAuthorId = process.env.WORDPRESS_POST_AUTHOR_ID;

    if (!wordpressPostAuthorId) {
        throw new Error('WordPress post author ID is not set');
    }

    return wordpressPostAuthorId;
}
