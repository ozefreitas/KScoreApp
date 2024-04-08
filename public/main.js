const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
require("@electron/remote/main").initialize()

const isMac = process.platform === "darwin";

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "KScoreApp",
    height: 600,
    autoHideMenuBar: true,
    icon: __dirname + "/karate-score.ico",
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true
    }
  });
  // mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, "../build/index.html"),
    protocol: "file",
    slashes: true,
  });

  mainWindow.loadURL(startUrl);
};

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});
