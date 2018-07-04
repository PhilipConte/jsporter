import electron, { remote } from 'electron';
const { remote: { dialog } } = electron;

export function getDBDialog() {
    const ind = dialog.showMessageBox(
        remote.getCurrentWindow(),
        {
            type: "question",
            buttons: [
                "Open Card File",
                "Create New Card File",
                "Quit"],
            defaultId: 0,
            title: "Open or Create Card File",
            message: "Open or Create Card File"
        }
    );
    switch (ind) {
        case 0: return openDialog();
        case 1: return createDialog("Create a New CardFile");
        default: return null;
    }
}

export function openDialog() {
    const loc = dialog.showOpenDialog(
        remote.getCurrentWindow(),
        {
            title: "Open an Existing Card File",
            filters: [{ name: "Card Files (.db)", extensions: ['db'] }],
            properties: ["openFile"]
        }
    );
    if (loc && loc.length == 1) return loc[0];
    return null;
}

export function createDialog() {
    return dialog.showSaveDialog(
        remote.getCurrentWindow(),
        {
            title: "Create a New CardFile" + " (.db)",
            buttonLabel: "Create a New CardFile",
            filters: [{ name: "Card Files (.db)", extensions: ['db'] }],
            properties: ["openFile", "createDirectory", "promptToCreate"]
        }
    );
}

export function ezError(eMessage) {
    dialog.showErrorBox("Error:", eMessage);
}
