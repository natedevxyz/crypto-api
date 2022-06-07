const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const PORT = 8000;

app.use(cors());

require('dotenv').config();
const apiKey = process.env.API_KEY;

const obj = {
	eth: {},
	btc: {},
};

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/index.js', (req, res) => {
	res.sendFile(__dirname + '/index.js');
});

app.listen(process.env.PORT || PORT, () => {
	console.log(`server running on port ${PORT}`);
});

app.get('/api', async (req, res) => {
	await data();
	res.json(obj);
});

app.get('/api/:coin', async (req, res) => {
	const coin = req.params.coin.toLowerCase();
	await data();
	if (obj[coin]) {
		res.json(obj[coin]);
	}
});

async function data() {
	try {
		const res1 = await axios.get(
			`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
		);
		const res2 = await axios.get(
			`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
		);
		const res3 = await axios.get(
			`https://free.currconv.com/api/v7/convert?q=USD_CLP&compact=ultra&apiKey=${apiKey}`
		);
		obj.eth.eth_clp = Math.trunc(
			res1.data.ethereum.usd * res3.data.USD_CLP.toFixed(2)
		);
		obj.eth.eth_usd = Math.trunc(res1.data.ethereum.usd);
		obj.eth.usd_clp = +res3.data.USD_CLP.toFixed(2);
		obj.btc.btc_clp = Math.trunc(
			res2.data.bitcoin.usd * res3.data.USD_CLP.toFixed(2)
		);
		obj.btc.btc_usd = Math.trunc(res2.data.bitcoin.usd);
		obj.btc.usd_clp = +res3.data.USD_CLP.toFixed(2);
	} catch (err) {
		console.error(err);
	}
}
