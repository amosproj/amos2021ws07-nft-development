import { create, globSource } from 'ipfs-http-client'
import fs from 'fs'
import { Parser } from 'json2csv'

//IPFS daemon should be running! https://docs.ipfs.io/how-to/command-line-quick-start/#initialize-the-repository
// connect to the default API address http://localhost:5001
const ipfs = await create();

// connect using a URL
//const client = create(new URL('http://127.0.0.1:5002'))

const data = [];

// Uploading files to IPFS. Set the file location: (globSource('./folder',
for await (const file of ipfs.addAll(globSource('../../../assets/nuremberg-parts', '**/*'))) {
    file.cid = String(file.cid);
    file.url = "https://ipfs.io/ipfs/" + file.cid;
    data.push(file);
}

// Saves hashes to JSON file
try {
    fs.writeFileSync("../../../assets/output.json", JSON.stringify(data),);
    console.log("JSON file has been saved.");
} catch (err) {
    console.log("An error occured while writing JSON Object to File.");
    console.error(err);
}

// Saves hashes to CSV file
try {
    const parser = new Parser({ fields: [ 'path', 'cid', 'url', 'size' ] });
    const csv = parser.parse(data);
    fs.writeFileSync('../../../assets/output.csv', csv);
    console.log("CSV file has been saved.");
} catch (err) {
    console.log("An error occured while writing JSON Object to File.");
    console.error(err);
}