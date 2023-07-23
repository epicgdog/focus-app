const { app, BrowserWindow,  ipcMain, dialog } = require("electron")
const path = require("path")
const fs = require('fs')
const readline = require("readline")
const todoData = "./public/todoData.txt"
const timerData = "./public/timerData.txt"
const playlistData = "./public/playlistData.txt"

const createWindow = () => {
    const win = new BrowserWindow({ 
        width: 800, 
        height: 600, 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js') //this basically exposes info gained from preload.js to a client js script
        }
    }) 
    win.loadURL( 'http://localhost:3000' ) // for now idk how to package lol
}

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

const deleteLine = (index, dataFile) => {
  return new Promise( (resolve, reject) => {
    fs.readFile(dataFile, "utf8", (error, data) => {
      if (error){ reject(error); return;}
      let lines = data.split("\n")
      if (index < 0 || index >= lines.length){
        reject( new Error("poopy index"))
        return
      }
      lines.splice(index, 1)
      console.log(lines)
      fs.writeFile(dataFile, lines.join("\n"), (error) => { error ? reject(error) : resolve() })
    })
  })

}


app.whenReady().then(() => {
    console.log("ready!")
    ipcMain.handle("saveData", (_, data, component) => {
      if (component == "todo"){
        fs.appendFile(todoData, data + "\n", (error) => { error ? console.error(error) : console.log("wrote successfully!")})
      } else if (component == "timer") {
        fs.writeFileSync(timerData, data, (error) => { error ? console.error(error) : console.log("wrote successfully!")})
      }
    })
    ipcMain.handle("getData", async (_, component ) => {
      if (component == "todo"){
        return await readFile(todoData)
      } else if (component == "timer"){
        return await readFile(timerData)
      } else if (component == "playlist"){
        return await readFile(playlistData)
      }
    })

    ipcMain.handle("removeData", async (_, index, component) => {
      if (component == "todo") {
        return await deleteLine(index, todoData)
      } else if (component == "playlist"){
        return await deleteLine(index, playlistData)
      }
    })

    ipcMain.handle("openFileDialog", async () => {
      const item = dialog.showOpenDialogSync({ filters: [{ name: "Music", extensions: ["mp3", "m4a"]}], properties: ["openFile", "multiSelections"] })
      if (item.length < 1){return}
      for (const i in item){
        fs.appendFile(playlistData, item[i] +  "\n", (error) => { error ? console.error(error) : console.log("wrote successfully!")})
        console.log(item[i])
      }
      return item
    })
    createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

// so when all windowsa are all closed, teh app will automatically quit
app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') app.quit()
})
