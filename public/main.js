const { app, BrowserWindow,  ipcMain, dialog, Menu } = require("electron")
const path = require("path")
const fs = require('fs')
const readline = require("readline")

// storing all data in a .txt file
// first row is todos
// second is timer
// third is the playlist
const database = "./public/database.txt"

const readFile = (file) => {
  return new Promise( (resolve, reject) => {
    const lines = []
    const lineReader = readline.createInterface({
      input: fs.createReadStream(file)
    })
    lineReader.on("line", (line) => {
      lines.push(line)
    })
    lineReader.on("close", () => {
      resolve(lines)
    })
    lineReader.on("error", (error) => {
      reject(error)
    })
  } )
}

app.whenReady().then(() => {
    console.log("ready!")
    const win = new BrowserWindow({ 
        width: 800, 
        height: 600, 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), //this basically exposes info gained from preload.js to a client js script
            webSecurity: false // allows access to local files
        }
    }) 


    win.loadURL( 'http://localhost:3000' ) // for now idk how to package lol
    win.on("close", (e) => {
      e.preventDefault()
      win.webContents.send("saveAllData")
    })
    ipcMain.handle("getData", async () => {
      return await readFile(database)
    })

    ipcMain.handle("openFileDialog", async () => {
      const item = dialog.showOpenDialogSync({ filters: [{ name: "Music", extensions: ["mp3", "m4a"]}], properties: ["openFile", "multiSelections"] })
      if (!item || item.length < 1){ return }
      return item
    })
    ipcMain.on("dataToSave", (_, data) => {
      const realData = `${data.todos.join(":")}\n${data.workTime + " " + data.breakTime}\n${data.pl.join(" : ")}`
      fs.writeFile(database, realData, (error) => {
        if (error){ 
          console.error(error) 
        } else {
          console.log(realData)
          win.destroy()
        }
      })
    })

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
// so when all windowsa are all closed, teh app will automatically quit
app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') app.quit()
})
