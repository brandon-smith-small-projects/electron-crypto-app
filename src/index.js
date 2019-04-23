const electron = require('electron');
const path = require('path');
const axios = require('axios');
const BrowserWindow = electron.remote.BrowserWindow;
const ipc = electron.ipcRenderer;

const notifyBTN = document.querySelector('#notifyBtn');
const price = document.querySelector('h1');
const targetPrice = document.querySelector('#targetPrice');
let targetPriceVal;

const getBTC = () => {
	axios
		.get(
			'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=f8c43b36ef8aa99d338f0b0d246e2f8646c0680b84391f0ac229172e51b98c37',
		)
		.then(res => {
			const cryptos = res.data.USD;
			price.innerHTML = '$' + cryptos.toLocaleString('en');
		});
};

getBTC();
setInterval(() => {
	getBTC();
}, 30000);

currentWindow = electron.screen.getCursorScreenPoint();

notifyBTN.addEventListener('click', e => {
	const modalPath = path.join('file://', __dirname, 'add.html');
	let win = new BrowserWindow({
		width: 400,
		height: 200,
		frame: false,
		transparent: true,
		alwaysOnTop: true,
		x: currentWindow.x,
		y: currentWindow.y,
	});
	win.on('close', () => (win = null));
	win.loadURL(modalPath);
	win.show();
});

ipc.on('targetPriceVal', (event, arg) => {
	targetPriceVal = Number(arg);
	targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en');
});
