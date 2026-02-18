const { createClient } = require('next-sanity');

const projectId = "wiheijdk";
const dataset = "production";
const apiVersion = "2024-05-28";

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
});

async function debug() {
    try {
        const skills = await client.fetch('*[_type == "skill"][0...5]');
        console.log("SKILLS DATA:", JSON.stringify(skills, null, 2));

        const projects = await client.fetch('*[_type == "project"][0...5]');
        console.log("PROJECTS DATA:", JSON.stringify(projects, null, 2));
    } catch (err) {
        console.error("ERROR:", err);
    }
}

debug();
