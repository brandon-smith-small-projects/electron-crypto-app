const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const shell = require('electron').shell;

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);

// Enable live reload for Electron too
require('electron-reload')(__dirname, {
	// Note that the path to electron may vary according to the main file
	electron: require(`${__dirname}/node_modules/electron`),
});

function createWindow() {
	let win = new BrowserWindow({
		width: 800,
		height: 600,
	});

	win.loadURL(
		url.format({
			pathname: path.join(__dirname, 'src/index.html'),
			protocol: 'file:',
			slashes: true,
		}),
	);

	win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});

	const menu = Menu.buildFromTemplate([
		{
			label: 'Menu',
			submenu: [
				{ label: 'Adjust Notification Value' },
				{
					label: 'CoinMarketCap',
					click() {
						shell.openExternal('http://coinmarketcap.com');
					},
				},
				{ type: 'separator' },
				{
					label: 'Exit',
					click() {
						app.quit();
					},
				},
			],
		},
		{
			label: 'Info',
		},
	]);
	Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
});
