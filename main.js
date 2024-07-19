// set up a basic electron app

const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
    });

    mainWindow.webContents.openDevTools();
    
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});