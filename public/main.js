const { app, BrowserWindow,  ipcMain } = require("electron")
const path = require("path")
const fs = require('fs')
const readline = require("readline")
const todoData = "./public/todoData.txt"
const timerData = "./public/timerData.txt"

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
        fs.appendFile(timerData, data + "\n", (error) => { error ? console.error(error) : console.log("wrote successfully!")})
      }
    })
    ipcMain.handle("getData", async (_, component ) => {
      if (component == "todo"){
        return await readFile(todoData)
      }
    })

    ipcMain.handle("removeData", async (_, index, component) => {
      if (component == "todo") {
        return await deleteLine(index)
      }
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
