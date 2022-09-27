const pickerOpts = {
    types: [
        {
            description: 'Fichiers texte',
            accept: { 'text/*': ['.txt', '.md', '.html', '.htm', '.xml', '.json'] }
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false
};

var outputStream;

function getTheFile() {
    if(!window.showOpenFilePicker){
        handleError('Navigateur non pris en charge !');
        return;
    }
    // open file picker
    window.showOpenFilePicker(pickerOpts).then(function ([fileHandle]) {
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
    document.getElementById('editor').value = contents;
}

function requestWritableStream(fileHandle){
    const saveButton = document.getElementById('btn-save');

    outputStream = undefined;
    saveButton.disabled = true;

    fileHandle.createWritable().then(function(writableStream){
        outputStream = writableStream;
        saveButton.disabled = false;
    });
}

function handleError(error) {
    alert(`ERREUR : ${error}`);
    console.error(error);
}



document.getElementById('btn-open').addEventListener('click', getTheFile);