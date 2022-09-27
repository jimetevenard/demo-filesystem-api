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

function getTheFile() {
    if(!window.showOpenFilePicker){
        handleError('Navigateur non pris en charge !');
        return;
    }
    // open file picker
    window.showOpenFilePicker(pickerOpts).then(function ([fileHandle]) {

        // get file contents
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

function handleError(error) {
    alert(`ERREUR : ${error}`);
    console.error(error);
}

document.getElementById('btn-open').addEventListener('click', getTheFile);