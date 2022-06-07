function getTime() {
	const url = 'https://worldtimeapi.org/api/timezone/America/Santiago';

	fetch(url)
		.then(res => res.json())
		.then(data => {
			let milisecs = data.unixtime * 1000;
			let date = new Date(milisecs);
			document.querySelector(
				'h4'
			).innerText = `Last update: ${date.toLocaleString()}`;
		})
		.catch(err => {
			console.log(`error ${err}`);
		});
}

function getData() {
	fetch('/api')
		.then(res => res.json())
		.then(data => {
			document.querySelector('#usd').innerText =
				data.eth.usd_clp.toLocaleString(undefined, {
					style: 'currency',
					currency: 'CLP',
					minimumFractionDigits: 2,
				});
			document.querySelector('#ethUsd').innerText =
				data.eth.eth_usd.toLocaleString(undefined, {
					style: 'currency',
					currency: 'USD',
					minimumFractionDigits: 0,
				});
			document.querySelector('#clpEth').innerText =
				data.eth.eth_clp.toLocaleString(undefined, {
					style: 'currency',
					currency: 'CLP',
				});
			document.querySelector('#btcUsd').innerText =
				data.btc.btc_usd.toLocaleString(undefined, {
					style: 'currency',
					currency: 'USD',
					minimumFractionDigits: 0,
				});
			document.querySelector('#clpBtc').innerText =
				data.btc.btc_clp.toLocaleString(undefined, {
					style: 'currency',
					currency: 'CLP',
				});
		})
		.catch(err => {
			console.log(`error ${err}`);
		});
}

function showData() {
	getTime();
	getData();
}

showData();
const timer = setInterval(showData, 1000 * 60);
