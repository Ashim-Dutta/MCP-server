import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod";

const server = new McpServer({
    name: "My MCP Server",
    version: "1.0.0",
})



server.registerTool("addTwoNumbers", {
    title: "Add Two Numbers",
    description: "Adds two numbers togather",
    inputSchema: z.object({
        a: z.number().describe("The first number"),
        b:z.number().describe("The second number")
    })
},
    
    async ({ a, b }) => {
        return {
            content: [
                {
                    type: "text",
                    text:String(a+b)
                }
            ]
        }
    }
    
)



const transport = new StdioServerTransport();
await server.connect(transport)