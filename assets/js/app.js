console.log('Hello from app.js');

class Metro2File {
    constructor(header, records, trailer) {
        this.headerStr = header;
        this.recordStrs = records;
        this.trailerStr = trailer;

        this.parseHeader();
        this.parseTrailer();
        this.parseRecords();
    }

    parseHeader() {
        const header = this.headerStr;

        const headerObj = {
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

    parseTrailer() {
        const trailer = this.trailerStr;

        const trailerObj = {
            totalBaseRecords: trailer.slice(12, 21),
            totalStatusCodeDF: trailer.slice(29, 38),
            totalConsumerSegmentsJ1: trailer.slice(38, 47),
            totalConsumerSegmentsJ2: trailer.slice(47, 56),
            blockCount: trailer.slice(56, 65),
            totalStatusCodeDA: trailer.slice(65, 74),
            totalStatusCode05: trailer.slice(74, 83),
            totalStatusCode11: trailer.slice(83, 92),
            totalStatusCode13: trailer.slice(92, 101),
            totalStatusCode61: trailer.slice(101, 110),
            totalStatusCode62: trailer.slice(110, 119),
            totalStatusCode63: trailer.slice(119, 128),
            totalStatusCode64: trailer.slice(128, 137),
            totalStatusCode65: trailer.slice(137, 146),
            totalStatusCode71: trailer.slice(146, 155),
            totalStatusCode78: trailer.slice(155, 164),
            totalStatusCode80: trailer.slice(164, 173),
            totalStatusCode82: trailer.slice(173, 182),
            totalStatusCode83: trailer.slice(182, 191),
            totalStatusCode84: trailer.slice(191, 200),
            totalStatusCode88: trailer.slice(200, 209),
            totalStatusCode89: trailer.slice(209, 218),
            totalStatusCode93: trailer.slice(218, 227),
            totalStatusCode94: trailer.slice(227, 236),
            totalStatusCode95: trailer.slice(236, 245),
            totalStatusCode96: trailer.slice(245, 254),
            totalStatusCode97: trailer.slice(254, 263),
            totalEcoaCodeZ: trailer.slice(263, 272),
            totalEmploymentSegments: trailer.slice(272, 281),
            totalOriginalCreditorSegments: trailer.slice(281, 290),
            totalPurchaseSegments: trailer.slice(290, 299),
            totalMortgageSegments: trailer.slice(299, 308),
            totalPaymentSegments: trailer.slice(308, 317),
            totalChangeSegments: trailer.slice(317, 326),
            totalSocialSecurityNumbers: trailer.slice(326, 335),
            totalSocialSecurityNumbersBase: trailer.slice(335, 344),
            totalSocialSecurityNumbersJ1: trailer.slice(344, 353),
            totalSocialSecurityNumbersJ2: trailer.slice(353, 362),
            totalDatesOfBirth: trailer.slice(362, 371),
            totalDatesOfBirthBase: trailer.slice(371, 380),
            totalDatesOfBirthJ1: trailer.slice(380, 389),
            totalDatesOfBirthJ2: trailer.slice(389, 398),
            totalPhoneNumbers: trailer.slice(398, 407),
        }

        for (let key in trailerObj) {
            trailerObj[key] = parseInt(trailerObj[key]);
        }

        this.trailer = trailerObj;
    }

    parseRecords() {
        const records = this.recordStrs;

        const recordObjs = records.map(record => {
            const recordObj = {
                recordDescriptor: record.slice(0, 4),
                processingIndicator: record.slice(4, 5),
                timestampDate: parseMetro2Date(record.slice(5, 13)),
                correctionIndicator: record.slice(19, 20),
                identificationNumber: record.slice(20, 40),
                cycleNumber: record.slice(40, 42),
                consumerAccountNumber: record.slice(42, 72),
                portfolioType: record.slice(72, 73),
                accountType: record.slice(73, 75),
                dateOpened: parseMetro2Date(record.slice(75, 83)),
                creditLimit: parseInt(record.slice(84, 93)),
                highestCredit: parseInt(record.slice(93, 101)),
                termsDuration: record.slice(101, 104),
                termsFrequency: record.slice(104, 105),
                scheduledMonthlyPayment: parseInt(record.slice(105, 114)),
                actualPaymentAmount: parseInt(record.slice(114, 123)),
                accountStatus: record.slice(123, 125),
                paymentRating: record.slice(125, 126),
                paymentHistoryProfile: record.slice(126, 150),
                specialComment: record.slice(150, 152),
                complianceConditionCode: record.slice(152, 154),
                currentBalance: parseInt(record.slice(154, 163)),
                amountPastDue: parseInt(record.slice(163, 172)),
                originalChargeOffAmount: parseInt(record.slice(172, 181)),
                billingDate: parseMetro2Date(record.slice(181, 189)),
                firstDelinquencyDate: parseMetro2Date(record.slice(189, 197)),
                closedDate: parseMetro2Date(record.slice(197, 205)),
                lastPaymentDate: parseMetro2Date(record.slice(205, 213)),
                consumerTransactionType: record.slice(230, 231),
                surname: record.slice(231, 256),
                firstName: record.slice(256, 276),
                middleName: record.slice(276, 296),
                generationCode: record.slice(296, 297),
                socialSecurityNumber: record.slice(297, 306),
                dateOfBirth: parseMetro2Date(record.slice(306, 314)),
                telephoneNumber: record.slice(314, 324),
                ecoaCode: record.slice(324, 325),
                consumerInformationIndicator: record.slice(325, 327),
                countryCode: record.slice(327, 329),
                firstLineAddress: record.slice(329, 361),
                secondLineAddress: record.slice(361, 393),
                city: record.slice(393, 413),
                state: record.slice(413, 415),
                postalCode: record.slice(415, 424),
                addressIndicator: record.slice(424, 425),
                residenceCode: record.slice(425, 426),
                j1SegmentIdentifier: null,
                j1ConsumerTransactionType: null,
                j1Surname: null,
                j1FirstName: null,
                j1MiddleName: null,
                j1GenerationCode: null,
                j1SocialSecurityNumber: null,
                j1DateOfBirth: null,
                j1TelephoneNumber: null,
                j1EcoaCode: null,
                j1ConsumerInformationIndicator: null,
                j2SegmentIdentifier: null,
                j2ConsumerTransactionType: null,
                j2Surname: null,
                j2FirstName: null,
                j2MiddleName: null,
                j2GenerationCode: null,
                j2SocialSecurityNumber: null,
                j2DateOfBirth: null,
                j2TelephoneNumber: null,
                j2EcoaCode: null,
                j2ConsumerInformationIndicator: null,
                j2CountryCode: null,
                j2FirstLineAddress: null,
                j2SecondLineAddress: null,
                j2City: null,
                j2State: null,
                j2PostalCode: null,
                j2AddressIndicator: null,
                j2ResidenceCode: null,
            };

            // add j1 and j2 fields if the record is a consumer segment
            if (recordObj.recordDescriptor === '0526') {
                recordObj.j1SegmentIdentifier = record.slice(426, 428);
                recordObj.j1ConsumerTransactionType = record.slice(428, 429);
                recordObj.j1Surname = record.slice(429, 454);
                recordObj.j1FirstName = record.slice(454, 474);
                recordObj.j1MiddleName = record.slice(474, 494);
                recordObj.j1GenerationCode = record.slice(494, 495);
                recordObj.j1SocialSecurityNumber = record.slice(495, 504);
                recordObj.j1DateOfBirth = parseMetro2Date(record.slice(504, 512));
                recordObj.j1TelephoneNumber = record.slice(512, 522);
                recordObj.j1EcoaCode = record.slice(522, 523);
                recordObj.j1ConsumerInformationIndicator = record.slice(523, 525);
            } else if (recordObj.recordDescriptor === '0626') {
                recordObj.j2SegmentIdentifier = record.slice(426, 428);
                recordObj.j2ConsumerTransactionType = record.slice(428, 429);
                recordObj.j2Surname = record.slice(429, 454);
                recordObj.j2FirstName = record.slice(454, 474);
                recordObj.j2MiddleName = record.slice(474, 494);
                recordObj.j2GenerationCode = record.slice(494, 495);
                recordObj.j2SocialSecurityNumber = record.slice(495, 504);
                recordObj.j2DateOfBirth = parseMetro2Date(record.slice(504, 512));
                recordObj.j2TelephoneNumber = record.slice(512, 522);
                recordObj.j2EcoaCode = record.slice(522, 523);
                recordObj.j2ConsumerInformationIndicator = record.slice(523, 525);
                recordObj.j2CountryCode = record.slice(525, 527);
                recordObj.j2FirstLineAddress = record.slice(527, 559);
                recordObj.j2SecondLineAddress = record.slice(559, 591);
                recordObj.j2City = record.slice(591, 611);
                recordObj.j2State = record.slice(611, 613);
                recordObj.j2PostalCode = record.slice(613, 622);
                recordObj.j2AddressIndicator = record.slice(622, 623);
                recordObj.j2ResidenceCode = record.slice(623, 624);
            }

            // trim extra whitespace from each object value if it is a string
            for (let key in recordObj) {
                if (typeof recordObj[key] === 'string') {
                    recordObj[key] = recordObj[key].trim();
                }
            }

            return recordObj;
        });

        this.records = recordObjs;
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

const createBootstrapTable = (parentEl, dataObj) => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-hover', 'table-sm');
    parentEl.appendChild(table);

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

    for (let key in dataObj) {
        const row = document.createElement('tr');
        tableBody.appendChild(row);

        const keyCell = document.createElement('td');
        const keyWords = key.split(/(?<=[a-z])(?=[A-Z0-9])/);
        let keyTitle = keyWords.join(' ');
        keyTitle = keyTitle.replace(/\b\w/g, char => char.toUpperCase());
        keyCell.innerText = keyTitle;
        row.appendChild(keyCell);

        const valueCell = document.createElement('td');
        valueCell.innerText = dataObj[key];
        row.appendChild(valueCell);
    }
}

const displayHeaderInfo = header => {
    const headerInfo = document.getElementById('header-content');

    // remove all previous header info
    while (headerInfo.firstChild) {
        headerInfo.removeChild(headerInfo.firstChild);
    }

    // display header info
    const headerTitle = document.createElement('h2');
    headerTitle.classList.add('mt-5');
    headerTitle.innerText = 'Header Information';
    headerInfo.appendChild(headerTitle);

    // set up a bootstrap table to show the header info
    createBootstrapTable(headerInfo, header);
}

const displayTrailerInfo = trailer => {
    const trailerInfo = document.getElementById('trailer-content');

    // remove all previous trailer info
    while (trailerInfo.firstChild) {
        trailerInfo.removeChild(trailerInfo.firstChild);
    }

    // display trailer info
    const trailerTitle = document.createElement('h2');
    trailerTitle.classList.add('mt-5');
    trailerTitle.innerText = 'Trailer Information';
    trailerInfo.appendChild(trailerTitle);

    // set up a bootstrap table to show the trailer info
    createBootstrapTable(trailerInfo, trailer);
}

const displayRecordsInfo = records => {
    console.log(records);
}

const parseMetro2File = fileContent => {
    const lines = fileContent.split('\n');

    const header = lines[0];
    const records = lines.slice(1, lines.length - 1);
    const trailer = lines[lines.length - 1];

    const metro2File = new Metro2File(header, records, trailer);

    displayHeaderInfo(metro2File.header);
    displayRecordsInfo(metro2File.records);
    displayTrailerInfo(metro2File.trailer);
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