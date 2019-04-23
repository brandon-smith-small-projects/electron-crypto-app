const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;

const notifyBTN = document.querySelector('#notifyBtn');

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
