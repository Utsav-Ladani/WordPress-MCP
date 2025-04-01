# WordPress MCP

A Model Context Protocol server for WordPress content management. It has ability to create, update, search and get posts. It also has ability to get WordPress block types schema to generate post content using blocks.

## 📺 Demo

TBA

## 📦 Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Build the server:
   ```bash
   pnpm run build
   ```

3. Add Claude MCP server configuration:

   Follow `Testing your server with Claude for Desktop` section in [MCP Server Example Documentation](https://modelcontextprotocol.io/quickstart/server)

   Your `claude_desktop_config.json` should look like this:
   ```json
   {
     "mcpServers": {
       "wordpress": {
         "command": "node",
         "args": ["<PATH_TO_PROJECT_FOLDER>/build/index.js"],
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

## 📝 Available Tools

- `createPost`: Create a new WordPress post
- `updatePost`: Update an existing post
- `searchPost`: Search for posts
- `getPost`: Get a specific post
- `blockTypesSchema`: Get WordPress block types schema

---

🎉 Happy vibe blogging 🎉
