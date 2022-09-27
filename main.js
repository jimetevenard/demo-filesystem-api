const pickerOpts = {
    types: [
      {
        description: 'Images',
        accept: {
          'text/*': ['.txt', '.md', '.html', '.htm', '.xml', '.json']
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  };
  
  async function getTheFile() {
    // open file picker
    // NB : entre crochet car showOpenFilePicker retourne un array : on pourrait avoir plusieurs fichiers
    // Ex. [foo] = ["foo", "bar", "baz"];
    [fileHandle] = await window.showOpenFilePicker(pickerOpts);
  
    // get file contents
    const fileData = await fileHandle.getFile();
    console.log(fileData);

    const metadata = `${fileData.name} - modifié le ${fileData.lastModifiedDate}`;
    document.getElementById('metadata').innerText = metadata;

    const contents = await fileData.text()
    document.getElementById('editor').value = contents;
  }
  
  document.getElementById('btn-open')
     .addEventListener('click', getTheFile);