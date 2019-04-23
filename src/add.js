const electron = require('electron');
const path = require('path');
const remote = electron.remote;
const ipc = electron.ipcRenderer;

const closeBtn = document.querySelector('#closeBtn');

closeBtn.addEventListener('click', () => {
	const window = remote.getCurrentWindow();
	window.close();
});

const updateBtn = document.querySelector('#updateBtn');
updateBtn.addEventListener('click', () => {
	ipc.send('update-notify-value', document.getElementById('notifyVal').value);

	const window = remote.getCurrentWindow();
	window.close();
});
