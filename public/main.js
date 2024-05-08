const { app, BrowserWindow, ipcMain, shell } = require("electron");
const url = require("url");
const path = require("path");
const XLSX = require("xlsx");
require("@electron/remote/main").initialize();

const isMac = process.platform === "darwin";

function generateExcel(data, file) {
  try {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const outputPath = path.join(app.getPath("downloads"), file);
    XLSX.writeFile(wb, outputPath);
    console.log("Excel file generated successfully at:", outputPath);
    shell.openPath(outputPath);
  } catch (error) {
    console.error("Error generating Excel file:", error);
    mainWindow.webContents.send('excel-generation-error', error.message);
  }
}

ipcMain.on("generate-excel", (event, {data, file}) => {
  generateExcel(data, file);
});

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "KScoreApp",
    height: 600,
    autoHideMenuBar: true,
    icon: __dirname + "/karate-score.ico",
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
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
