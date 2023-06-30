const promisify = require("util").promisify
const API_GITHUB_URI = "https://api.github.com/search/repositories"
const fs = require("node:fs");
const path = require("node:path");
const avoidedRepos = ["https://github.com/josealejandro2928/OpenAADLDataset"];
const delay = promisify(setTimeout)

async function queryRepositories(queryParams = {}) {
    let data = []
    let page = 1
    let per_page = 50
    let total = 500
    while (true) {
        const searchParams = new URLSearchParams({ ...queryParams, sort: "stars", order: "desc", page, per_page });
        const URI = API_GITHUB_URI + "?" + searchParams;
        try {
            let resp = await fetch(URI, {
                method: "GET",
                headers: {
                    "CONTENT-TYPE": "application/json"
                }
            })
            let res = await resp.json()
            total = res.total_count

            if (res.items == null || res.items.length == 0) {
                break
            }
            await delay(5)
            page++
            data.push(...res.items)
            console.log(`Items: ${data.length} of ${total}`)
        } catch (e) {
            console.log("Error: ", e)
            return data
        }
    }
    return data
}

async function main() {
    console.log("LOADING...");
    // const query1 = { q: "aadl in:extension,name,description,readme,topics" };
    const query1 = { q: "aadl in:extension" };

    try {
        const setUris = new Set();
        let res = await Promise.all([queryRepositories(query1)])
        for (const data of res) {
            data.map((item) => setUris.add(item.html_url))
        }
        const data = [...setUris].filter(x => avoidedRepos.indexOf(x) == -1).map((item) => `"${item}",`).join("\n");
        fs.writeFileSync(path.join(__dirname, "result.txt"), data);
    } catch (e) {
        console.error("ERROR: ", e);
    } finally {
        console.log("FINISH");
    }
}

main();