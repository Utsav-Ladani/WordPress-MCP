import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
import { z } from "zod";
import { getHeaders, getWordPressHostURL, getWordPressPostAuthorId } from "../lib/wordpress.js";

export const name = "get-post";

export const description = "Get a WordPress post by its ID";

export const paramsSchema = {
    postId: z.number().nonnegative().describe('Post ID'),
};

export const callback = async ({ postId }: { postId: number }): Promise<CallToolResult> => {
    if (!postId) {
        return {
            content: [{
                type: 'text',
                text: 'Failed to get post because the post ID is empty'
            }]
        };
    }

    try {
        const post: any = await getPost(postId);

        return {
            content: [{
                type: 'text',
                text:
                    `Post ID: ${post.id}\n` +
                    `Title: ${post.title.rendered}\n` +
                    `Content: ${post.content.rendered}\n`,
            }]
        };
    } catch (error) {
        return {
            content: [{
                type: 'text',
                text: `Failed to get post. Error: ${error}`
            }]
        };
    }
};

const getPost = async (postId: number) => {
    const wordpressHostURL = getWordPressHostURL();

    const response = await fetch(`${wordpressHostURL}/wp-json/wp/v2/posts/${postId}`, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to get post. Status: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};
