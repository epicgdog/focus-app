const { contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld("comms", {
    getData: () => ipcRenderer.invoke("getData"),
    openFileDialog: () => ipcRenderer.invoke("openFileDialog"),
    onSaveData: (callback) => ipcRenderer.on("saveAllData", callback),
    onGetData: (callback) => ipcRenderer.on("previousData", callback)
})

contextBridge.exposeInMainWorld("pizza", "🍕🍕🍕🍕🍕🍕🍕🍕🍕")