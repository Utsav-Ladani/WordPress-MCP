import fetch from "node-fetch";
import { getHeaders, getWordPressHostURL } from "../lib/wordpress.js";
import { BlockType } from "../types.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const name = "wordpress-block-types-schema";

export const description = "Available WordPress block types that can be used for content creation";

export const callback = async (): Promise<CallToolResult> => {
    const blockTypes = await fetchBlockTypes();

    return {
        content: [{
            type: "text",
            text: formatBlockTypes(blockTypes),
        }]
    }
}

const fetchBlockTypes = async (): Promise<BlockType[]> => {
    const wordpressHostURL = getWordPressHostURL();

    const response = await fetch(
        `${wordpressHostURL}/wp-json/wp/v2/block-types`,
        { headers: getHeaders() }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch block types. Status: ${response.status}`);
    }

    return response.json() as Promise<BlockType[]>;
};

const formatBlockTypes = (blockTypes: BlockType[]): string => {
    return blockTypes.map(blockType =>
        `Name: ${blockType.name}\n` +
        `Title: ${blockType.title}\n` +
        `Description: ${blockType.description}\n` +
        `Category: ${blockType.category}\n` +
        `##Attributes\n` +
        `${formatBlockAttributes(blockType.attributes)}\n`
    ).join('\n');
}

const formatBlockAttributes = (attributes: Record<string, any>): string => {
    return Object.entries(attributes)
        .map(([key, value]) =>
            `###${key}\n` +
            `${formatBlockAttribute(value)}\n`
        )
        .join('\n');
}

const formatBlockAttribute = (value: object): string => {
    return Object.entries(value)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
}
