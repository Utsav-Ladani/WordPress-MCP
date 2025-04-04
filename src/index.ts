import { ServerOptions } from "@modelcontextprotocol/sdk/server/index.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Implementation } from "@modelcontextprotocol/sdk/types.js";
import * as CreatePost from "./tools/create-post.js";
import * as BlockTypesSchema from "./tools/block-types-schema.js";
import * as UpdatePost from "./tools/update-post.js";
import * as SearchPosts from "./tools/search-posts.js";
import * as GetPost from "./tools/get-post.js";
import { config } from "dotenv";

config();

const serverInfo: Implementation = {
    name: "WordPress MCP",
    version: "1.0.0",
}

const serverOptions: ServerOptions = {
    capabilities: {
        resources: {},
        tools: {},
    },
}

const wordpressMCPServer = new McpServer(serverInfo, serverOptions)

wordpressMCPServer.tool(
    SearchPosts.name,
    SearchPosts.description,
    SearchPosts.paramsSchema,
    SearchPosts.callback,
);

wordpressMCPServer.tool(
    GetPost.name,
    GetPost.description,
    GetPost.paramsSchema,
    GetPost.callback,
);

wordpressMCPServer.tool(
    CreatePost.name,
    CreatePost.description,
    CreatePost.paramsSchema,
    CreatePost.callback,
);

wordpressMCPServer.tool(
    UpdatePost.name,
    UpdatePost.description,
    UpdatePost.paramsSchema,
    UpdatePost.callback,
);

wordpressMCPServer.tool(
    BlockTypesSchema.name,
    BlockTypesSchema.description,
    BlockTypesSchema.callback,
);

async function main() {
    const transport = new StdioServerTransport();
    await wordpressMCPServer.connect(transport);
}

main().catch((error) => {
    process.exit(1);
});