var Airtable = require('airtable');
// This is a read-only API key...don't get excited
var base = new Airtable({apiKey: 'keyt2DL8nfcAyl338'}).base('appVtB7KozrwvMKQm');

base('What').select({
    view: 'Grid view'
}).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    createTitle("Strategies:","whatList");
    records.forEach(function(record) {
        var what = record.get('What to do')
        var listPart = document.createElement("li");
        listPart.onclick = function() {
            return function(){
                showHows(what);
                const selectedElement = this.parentElement.getElementsByClassName('selected')
                const notSelectedElements = this.parentElement.children
                Array.from(selectedElement).forEach(item => item.classList.remove('selected')) 
                Array.from(notSelectedElements).forEach(item => item.classList.add('notSelected'))  
                this.classList.remove('notSelected');
                this.classList.add('selected');
            }
        }(what);
        var textNode = document.createTextNode(what);
        listPart.appendChild(textNode);
        document.getElementById("whatList").appendChild(listPart);
    });
});

function showHows(what) {
    document.getElementById("howList").textContent = ''
    document.getElementById("effortList").textContent = ''
    document.getElementById("mediaList").textContent = ''
    var filterFormula = "{What} = '" + what + "'"
    base('How').select({
        view: 'Grid view',
        filterByFormula: filterFormula

    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
    createTitle("Approaches:","howList");
        records.forEach(function(record) {
            var how = record.get('How')
            var listPart = document.createElement("li");
            listPart.onclick = function() {
                return function(){
                    showEfforts(how);
                    showMedia(how);
                    const selectedElement = this.parentElement.getElementsByClassName('selected')
                    const notSelectedElements = this.parentElement.children
                    Array.from(selectedElement).forEach(item => item.classList.remove('selected')) 
                    Array.from(notSelectedElements).forEach(item => item.classList.add('notSelected'))  
                    this.classList.remove('notSelected');
                    this.classList.add('selected');
                }
            }(how);
            var textNode = document.createTextNode(how);
            listPart.appendChild(textNode);
            document.getElementById("howList").appendChild(listPart);
        });
    });
}

function showEfforts(how) {
    document.getElementById("effortList").textContent = ''
    var filterFormula = "SEARCH('"+ how + "',{How}) >0"
    base('Efforts').select({
        view: 'Grid view',
        filterByFormula: filterFormula
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        createTitle("Efforts:","effortList");
        records.forEach(function(record) {
            var effort = record.get('Effort')
            var url = record.get('URL')
            var listPart = document.createElement("li");
            var a = document.createElement("a");
            a.textContent = effort;
            a.setAttribute('href', url);
            listPart.appendChild(a);
            document.getElementById("effortList").appendChild(listPart);
        });
    });
}
function showMedia(how) {
    document.getElementById("mediaList").textContent = ''
    var filterFormula = "SEARCH('"+ how + "',{How}) >0"
    base('Media').select({
        view: 'Grid view',
        filterByFormula: filterFormula
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        createTitle("Media:","mediaList");
        records.forEach(function(record) {
            var media = record.get('Media')
            var url = record.get('URL')
            var listPart = document.createElement("li");
            var a = document.createElement("a");
            a.textContent = media;
            a.setAttribute('href', url);
            listPart.appendChild(a);
            document.getElementById("mediaList").appendChild(listPart);
        });
    });
}

function createTitle(title,list) {
    var listPart = document.createElement("li");
    var textNode = document.createTextNode(title);
    listPart.appendChild(textNode);
    listPart.classList.add('title');
    document.getElementById(list).appendChild(listPart);
}