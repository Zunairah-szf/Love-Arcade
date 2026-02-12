require('dotenv').config();
const { MongoClient } = require('mongodb');

async function checkData() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("loveArcade");
        const matches = database.collection("matches");

        const count = await matches.countDocuments();
        console.log(`\n✅ TOTAL MATCHES SAVED: ${count}`);

        const latest = await matches.find().sort({ date: -1 }).limit(1).toArray();
        if (latest.length > 0) {
            console.log(`\nLast Match Saved:`);
            console.log(`names: ${latest[0].name1} & ${latest[0].name2}`);
            console.log(`time: ${latest[0].date}`);
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

checkData();
