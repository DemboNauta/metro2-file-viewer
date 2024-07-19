console.log('Hello from app.js');

class Metro2File {
    constructor(header, records, trailer) {
        this.headerStr = header;
        this.recordStrs = records;
        this.trailerStr = trailer;

        this.parseHeader();
    }

    parseHeader() {
        const header = this.headerStr;

        const headerObj = {
            recordDescriptorWord: header.slice(0, 4),
            recordIdentifier: header.slice(4, 10),
            cycleNumber: header.slice(10, 12),
            innovisProgramIdentifier: header.slice(12, 22),
            equifaxProgramIdentifier: header.slice(22, 32),
            experianProgramIdentifier: header.slice(32, 37),
            transUnionProgramIdentifier: header.slice(37, 47),
            activityDate: parseMetro2Date(header.slice(47, 55)),
            dateCreated: parseMetro2Date(header.slice(55, 63)),
            programDate: parseMetro2Date(header.slice(63, 71)),
            programRevisionDate: parseMetro2Date(header.slice(71, 79)),
            reporterName: header.slice(79, 119),
            reporterAddress: header.slice(119, 215),
            reporterPhone: header.slice(215, 225),
            softwareVendorName: header.slice(225, 265),
            softwareVersion: header.slice(265, 426),
        };

        // trim extra whitespace from each object value
        for (let key in headerObj) {
            headerObj[key] = headerObj[key].trim();
        }

        this.header = headerObj;
    }
}

const fileInput = document.getElementById('file-input');

const parseMetro2Date = dateStr => {
    // convert from MMDDYYYY to MM/DD/YYYY
    const month = dateStr.slice(0, 2);
    const day = dateStr.slice(2, 4);
    const year = dateStr.slice(4, 8);

    return `${month}/${day}/${year}`;
}

const displayHeaderInfo = header => {
    const headerInfo = document.getElementById('header-content');

    // remove all previous header info
    while (headerInfo.firstChild) {
        headerInfo.removeChild(headerInfo.firstChild);
    }

    // display header info
    const headerTitle = document.createElement('h2');
    headerTitle.innerText = 'Header Information';
    headerInfo.appendChild(headerTitle);

    // set up a bootstrap table to show the header info
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-hover', 'table-sm');
    headerInfo.appendChild(table);

    const tableHead = document.createElement('thead');
    table.appendChild(tableHead);

    const headRow = document.createElement('tr');
    tableHead.appendChild(headRow);

    const keyHead = document.createElement('th');
    keyHead.innerText = 'Field';
    headRow.appendChild(keyHead);

    const valueHead = document.createElement('th');
    valueHead.innerText = 'Value';
    headRow.appendChild(valueHead);

    const tableBody = document.createElement('tbody');
    tableBody.classList.add('table-body', 'table-group-divider');
    table.appendChild(tableBody);

    for (let key in header) {
        const row = document.createElement('tr');
        tableBody.appendChild(row);

        const keyCell = document.createElement('td');
        const keyWords = key.split(/(?=[A-Z])/);
        let keyTitle = keyWords.join(' ');
        keyTitle = keyTitle.replace(/\b\w/g, char => char.toUpperCase());
        keyCell.innerText = keyTitle;
        row.appendChild(keyCell);

        const valueCell = document.createElement('td');
        valueCell.innerText = header[key];
        row.appendChild(valueCell);
    }
}

const parseMetro2File = fileContent => {
    const lines = fileContent.split('\n');

    const header = lines[0];
    const records = lines.slice(1, lines.length - 1);
    const trailer = lines[lines.length - 1];

    const metro2File = new Metro2File(header, records, trailer);

    displayHeaderInfo(metro2File.header);
}

const readFileOnInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const data = reader.result;
        parseMetro2File(data);
    };

    reader.readAsText(file);
}

// listen for when a file is selected
fileInput.addEventListener('change', readFileOnInput);