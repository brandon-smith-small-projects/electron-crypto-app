const electron = require('electron');
const path = require('path');
const remote = electron.remote;

const closeBtn = document.querySelector('#closeBtn');

closeBtn.addEventListener('click', () => {
	const window = remote.getCurrentWindow();
	window.close();
});
