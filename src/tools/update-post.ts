import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
import { z } from "zod";
import { getHeaders, getWordPressHostURL, getWordPressPostAuthorId } from "../lib/wordpress.js";

export const name = "update-post";

export const description = "Update a WordPress post using Gutenberg blocks";

export const paramsSchema = {
    postId: z.number().nonnegative().describe('Post ID'),
    content: z.string().nonempty().describe(
        'Post content in WordPress block format.\n' +
        'Here is an example of the format:\n' +
        'If you given following blocks documentation:\n' +
        '```\n' +
        `
        Name: core/paragraph
        Title: Paragraph
        Description: Start with the basic building block of all narrative.
        Category: text
        ##Attributes
        ###align
        type: string

        ###content
        type: rich-text
        source: rich-text
        selector: p
        role: content

        ###dropCap
        type: boolean
        default: false

        ###placeholder
        type: string

        ###direction
        type: string
        enum: ltr,rtl

        ###lock
        type: object

        ###metadata
        type: object

        ###className
        type: string

        ###style
        type: object

        ###backgroundColor
        type: string

        ###textColor
        type: string

        ###gradient
        type: string

        ###fontSize
        type: string

        ###fontFamily
        type: string

        ###borderColor
        type: string
        ` +
        '```\n' +
        'You can use the following format:\n' +
        '```\n' +
        `
        <!-- wp:paragraph {"align":"center", "dropCap":true, "direction":"ltr", "fontSize":"large", "fontFamily":"serif", "borderColor":"red", "backgroundColor":"blue", "textColor":"green", "gradient":"linear-gradient(to right, #000000, #ffffff)", "style":{"color":"red", "background-color":"blue"}} -->
        <p class="has-text-align-center has-drop-cap has-large-font-size has-serif-font-family has-border-color has-background has-text-color has-gradient has-global-padding has-global-margin has-global-color has-global-font-size" style="color:red;background-color:blue;">Your paragraph content here.</p>
        <!-- /wp:paragraph -->
        ` +
        '```\n'
    ),
};

export const callback = async (params: any): Promise<CallToolResult> => {
    const { postId, content } = params;

    if (!postId) {
        return {
            content: [{
                type: 'text',
                text: 'Failed to update post because the post ID is empty'
            }]
        };
    }

    if (!content) {
        return {
            content: [{
                type: 'text',
                text: 'Failed to update post because the content is empty'
            }]
        };
    }

    try {
        await updatePost(postId, content);
    
        return {
            content: [{
                type: 'text',
                text: `Post with ID "${postId}" updated successfully`,
            }]
        };
    } catch (error) {
        return {
            content: [{
                type: 'text',
                text: `Failed to update post. Error: ${error}`
            }]
        };
    }
};

const updatePost = async (postId: number, content: string) => {
    const wordpressHostURL = getWordPressHostURL();
    const wordpressPostAuthorId = getWordPressPostAuthorId();

    const payload = {
        content,
        author: wordpressPostAuthorId,
        status: 'publish',
    }

    const response = await fetch(`${wordpressHostURL}/wp-json/wp/v2/posts/${postId}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to update post. Status: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};
