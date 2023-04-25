const API_GITHUB_URI = "https://api.github.com/search/repositories"
const fs = require("node:fs");
const path = require("node:path");

async function queryRepositories(queryParams = {}) {
    const searchParams = new URLSearchParams({ ...queryParams, sort: "stars", order: "desc" });
    const URI = API_GITHUB_URI + "?" + searchParams;
    let resp = await fetch(URI, {
        method: "GET",
        headers: {
            "CONTENT-TYPE": "application/json"
        }
    })
    return resp.json()
}

async function main() {
    console.log("LOADING...");
    const query1 = { q: "aadl in:name,description,readme,topics" };
    const query2 = { q: "osate in:name,description,readme,topics" };

    try {
        const setUris = new Set();
        let res = await Promise.all([queryRepositories(query1), queryRepositories(query2)])
        for (const data of res) {
            data.items.map((item) => setUris.add(item.html_url))
        }
        const data = [...setUris].join("\n");
        fs.writeFileSync(path.join(__dirname, "result.txt"), data);
    } catch (e) {
        console.error("ERROR: ", e);
    } finally {
        console.log("FINISH");
    }
}

main();