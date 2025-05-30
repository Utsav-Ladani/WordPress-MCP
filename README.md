# WordPress MCP

[![npm version](https://img.shields.io/npm/v/wordpress-mcp.svg)](https://www.npmjs.com/package/wordpress-mcp)
[![npm downloads](https://img.shields.io/npm/dm/wordpress-mcp.svg)](https://www.npmjs.com/package/wordpress-mcp)

A Model Context Protocol server for WordPress content management. It has ability to create, update, search and get posts. It also has ability to get WordPress block types schema to generate post content using blocks.

## 📺 Demo

This posts are entirely generated by Claude

Demo 1

https://github.com/user-attachments/assets/646a4497-81e6-4bdf-afe1-ce5ef2df587d

Demo 2

https://github.com/user-attachments/assets/6ec184c3-ba41-4699-a13a-0402e1a16ce4

## 📦 Installation

Add following configuration to your `claude_desktop_config.json` file to use this MCP server:

```json
{
  "mcpServers": {
    "wordpress": {
      "command": "npx",
      "args": ["-y", "wordpress-mcp"],
      "env": {
        "WORDPRESS_HOST_URL": "http://localhost:<PORT>",
        "WORDPRESS_API_USERNAME": "<WORDPRESS_USERNAME>",
        "WORDPRESS_API_PASSWORD": "<WORDPRESS_APPLICATION_PASSWORD>",
        "WORDPRESS_POST_AUTHOR_ID": "<WORDPRESS_POST_AUTHOR_ID>"
      }
    }
  }
}
```

Check `Testing your server with Claude for Desktop` section in [MCP Server Example Documentation](https://modelcontextprotocol.io/quickstart/server) for more details.

## 📝 Available Tools

- `createPost`: Create a new WordPress post
- `updatePost`: Update an existing post
- `searchPosts`: Search for posts by title or keyword
- `getPost`: Get a specific post
- `blockTypesSchema`: Get WordPress block types schema

---

🎉 Happy vibe blogging 🎉
