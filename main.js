const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

const isMac = process.platform === "darwin";

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "KScoreApp",
    height: 600,
    autoHideMenuBar: true,
    icon: __dirname + "/app/public/karate-score.ico",
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, "app/build/index.html"),
    protocol: "file",
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
