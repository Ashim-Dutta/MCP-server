import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import {GoogleGenAI,Type} from "@google/genai"


const weatherFunctionDeclaration = {
    name: "get_current_temparature",
    description: "Gets the current temparature for a given location",
    parameters: {
        type: Type.OBJECT,
        properties: {
            location: {
                type: Type.STRING,
                description: "The location to get the current temparature for"
            }
        },
        required: ["location"]
    }
}


const ai = new GoogleGenAI({
    api_key: process.env.GOOGLE_API_KEY || ""
}) 

const transport = new StdioClientTransport({
    command:"node",
    args:["./mcp.server.js"]
});


const client = new Client({
    name: "example-client",
    version:"1.0.0"
})

await client.connect(transport); 

client.listTools().then(response => {
    console.log(response)
    console.log(weatherFunctionDeclaration)
})