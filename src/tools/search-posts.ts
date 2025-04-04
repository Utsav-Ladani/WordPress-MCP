import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
import { z } from "zod";
import { getHeaders, getWordPressHostURL } from "../lib/wordpress.js";

export const name = "search-posts";

export const description = "Search for WordPress posts by title or keyword";

export const paramsSchema = {
    title: z.string().nonempty().describe('Post title or keyword'),
};

export const callback = async ({ title }: { title: string }): Promise<CallToolResult> => {
    if (!title) {
        return {
            content: [{
                type: 'text',
                text: 'Failed to search posts because the title is empty'
            }]
        };
    }

    try {
        const posts: any = await searchPosts(title);

        if (posts.length === 0) {
            return {
                content: [{
                    type: 'text',
                    text: 'No posts found'
                }]
            };
        }

        return {
            content: [{
                type: 'text',
                text: posts.map(formatPost).join('\n'),
            }]
        };
    } catch (error) {
        return {
            content: [{
                type: 'text',
                text: `Failed to search posts. Error: ${error}`
            }]
        };
    }
};

const searchPosts = async (title: string) => {
    const wordpressHostURL = getWordPressHostURL();

    const response = await fetch(`${wordpressHostURL}/wp-json/wp/v2/posts?search=${title}`, {
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Status: ${response.status} ${response.statusText}`);
    }

    const posts: any = await response.json();

    return posts;
};

const formatPost = (post: any) => {
    return (
        `Post ID: ${post.id}\n` +
        `Title: ${post.title.rendered}\n`
    );
};
