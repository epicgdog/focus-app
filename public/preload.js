const { contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld("comms", {
    getData: () => ipcRenderer.invoke("getData"),
    openFileDialog: () => ipcRenderer.invoke("openFileDialog"),
    onSaveData: (callback) => ipcRenderer.on("saveAllData", callback)
})

contextBridge.exposeInMainWorld("pizza", "🍕🍕🍕🍕🍕🍕🍕🍕🍕")