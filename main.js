/**
 * FileSystemWritableFileStream du fichier courant 
 */
var outputStreamGlobal;


function openFilePicker() {
    if(!window.showOpenFilePicker){
        handleError('Navigateur non pris en charge !');
        return;
    }

    const pickerOptions = {
        types: [
            {
                description: 'Fichiers texte',
                accept: { 'text/*': ['.txt', '.md', '.html', '.htm', '.xml', '.json'] }
            },
        ],
        excludeAcceptAllOption: true,
        multiple: false
    };

    // open file picker
    window.showOpenFilePicker(pickerOptions).then(function ([fileHandle]) {
        if(document.getElementById('checkbox-save').checked){
            requestWritableStream(fileHandle);
        }
        fileHandle.getFile().then(handleFileData, handleError);

    }, handleError);
}

function handleFileData(fileData) {
    const metadata = `${fileData.name} - modifié le ${fileData.lastModifiedDate}`;
    document.getElementById('metadata').innerText = metadata;

    fileData.text().then(displayFileContents, handleError);
}

function displayFileContents(contents){
    const editor = document.getElementById('editor');
    editor.value = contents;
    editor.disabled = false;
}

function requestWritableStream(fileHandle){
    const saveButton = document.getElementById('btn-save');

    outputStreamGlobal = undefined;
    saveButton.disabled = true;

    fileHandle.createWritable().then(function(writableStream){
        outputStreamGlobal = writableStream;
        saveButton.disabled = false;
    });
}

function saveFile(){
    if(!outputStreamGlobal) throw new Error('pas d\'accès en écriture');

    const editorContents = document.getElementById('editor').value;
    outputStreamGlobal.write(editorContents).then(() => {
        // NB: Ici, on laisse le navigateur gérer l'encoding à sa guise...
        outputStreamGlobal.close().then(() => alert('Fichier enregistré !'), handleError);
    }, handleError);
}

function handleError(error) {
    alert(`ERREUR : ${error}`);
    console.error(error);
}

document.getElementById('btn-open').addEventListener('click', openFilePicker);
document.getElementById('btn-save').addEventListener('click', saveFile);
