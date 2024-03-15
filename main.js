const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const { spawn } = require("child_process");

const isMac = process.platform === "darwin";

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "KScoreApp",
    height: 600,
    autoHideMenuBar: true,
    icon: __dirname + "/app/public/karate-score.ico",
  });
  mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, "app/build/index.html"),
    protocol: "file",
  });

  mainWindow.loadURL(startUrl);
};

app.whenReady().then(() => {
  const serverProcess = spawn("node", [
    path.join(__dirname, "server", "connect.js"),
  ]);

  serverProcess.stdout.on("data", (data) => {
    console.log(`Server stdout: ${data}`);
    // if (data.toString().includes("Server is running")) {

    //   // Server is ready, create the Electron window
    //   createMainWindow();
    // }
  });

  serverProcess.stderr.on("data", (data) => {
    console.error(`Server stderr: ${data}`);
  });

  serverProcess.on("close", (code) => {
    console.log(`Server process exited with code ${code}`);
  });

  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});
