import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
import { z } from "zod";
import { getHeaders, getWordPressHostURL, getWordPressPostAuthorId } from "../lib/wordpress.js";

export const name = "search-post";

export const description = "Search for a WordPress post by its title or keyword";

export const paramsSchema = {
    title: z.string().nonempty().describe('Post title'),
};

export const callback = async ({ title }: { title: string }): Promise<CallToolResult> => {
    if (!title) {
        return {
            content: [{
                type: 'text',
                text: 'Failed to search post because the title is empty'
            }]
        };
    }

    try {
        const post: any = await searchPost(title);

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
                text: `Failed to search post. Error: ${error}`
            }]
        };
    }
};

const searchPost = async (title: string) => {
    const wordpressHostURL = getWordPressHostURL();

    const response = await fetch(`${wordpressHostURL}/wp-json/wp/v2/posts?search=${title}`, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to search post. Status: ${response.status} ${response.statusText}`);
    }

    const posts: any = await response.json();

    if (posts.length === 0) {
        throw new Error(`No post found with title "${title}"`);
    }

    return posts[0];
};
