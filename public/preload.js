const { contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld("comms", {
    saveData: (data, component) => ipcRenderer.invoke("saveData", data, component), 
    getData: (component) => ipcRenderer.invoke("getData", component),
    removeData: (index, component) => ipcRenderer.invoke("removeData", index, component), 
    openFileDialog: () => ipcRenderer.invoke("openFileDialog")
})

contextBridge.exposeInMainWorld("pizza", "🍕🍕🍕🍕🍕🍕🍕🍕🍕")