/**
 * Created by Karuppannan.Prabakar on 12/2/2017.
 */
var genericDatas = [
            {
                "company_name": "Medline Industries, Inc.",
                "product": "Benzalkonium Chloride",
                "price": "481.63"
            },
            {
                "company_name": "PD-Rx Pharmaceuticals, Inc.",
                "product": "Alprazolam",
                "price": "167.62",
                "fda_date_approved": "02/12/2015"
            },
            {
                "company_name": "West-ward Pharmaceutical Corp.",
                "product": "Flumazenil",
                "fda_date_approved": "23/04/2015"
            },
            {
                "company_name": "HyVee Inc",
                "product": "Aspirin",
                "price": "218.32",
                "fda_date_approved": "26/07/2015"
            },
            {
                "company_name": "Aurobindo Pharma Limited",
                "product": "carisoprodol",
                "price": "375.58",
                "fda_date_approved": "28/11/2014"
            },
            {
                "company_name": "Apotex Corp",
                "product": "Risperidone",
                "price": "213.49",
                "fda_date_approved": "06/11/2015"
            },
            {
                "company_name": "Unit Dose Services",
                "product": "Lovastatin",
                "price": "169.14",
                "fda_date_approved": "14/09/2015"
            },
            {
                "company_name": "Jubilant HollisterStier LLC",
                "product": "Dog Hair Canis spp.",
                "fda_date_approved": "31/12/2014"
            },
            {
                "company_name": "AAA Pharmaceutical, Inc.",
                "product": "ACETAMINOPHEN, CHLORPHENIRAMINE MALEATE, DEXTROMETHORPHAN HYDROBROMIDE, and PHENYLEPHRINE HYDROCHLORIDE",
                "price": "183.33",
                "fda_date_approved": "13/12/2015"
            },
            {
                "company_name": "AKG Innovations LLC",
                "product": "AVOBENZONE, OCTINOXATE, OCTISALATE",
                "fda_date_approved": "22/01/2015"
            },
            {
                "company_name": "hikma Farmaceutica",
                "product": "Oxytocin"
            },
            {
                "company_name": "prime Packaging, Inc.",
                "product": "Avobenzone, Homosalate, Octisalate, Octocrylene, Oxybenzone",
                "price": "208.17"
            },
            {
                "company_name": "Davion, Inc",
                "product": "Triclosan",
                "price": "80.30",
                "fda_date_approved": "13/12/2014"
            },
            {
                "company_name": "CARDINAL HEALTH",
                "product": "CARBOXYMETHYLCELLULOSE SODIUM, GLYCERIN",
                "price": "330.22",
                "fda_date_approved": "11/08/2015"
            },
            {
                "company_name": "Amgen Inc",
                "product": "darbepoetin alfa",
                "price": "332.28",
                "fda_date_approved": "01/07/2015"
            },
            {
                "company_name": "Autumn Harp, Inc.",
                "product": "Salicylic Acid",
                "price": "34.43",
                "fda_date_approved": "25/03/2015"
            },
            {
                "company_name": "American Regent, Inc.",
                "product": "sodium phosphate, monobasic, monohydrate and sodium phosphate, dibasic anhydrous",
                "price": "11.60"
            },
            {
                "company_name": "J. A. Cosmetics U.S. INC",
                "product": "TITANIUM DIOXIDE",
                "price": "130.90",
                "fda_date_approved": "01/12/2015"
            },
            {
                "company_name": "NATURE REPUBLIC CO., LTD.",
                "product": "Titanium Dioxide, OCTINOXATE, Zinc Oxide",
                "price": "124.48"
            },
            {
                "company_name": "L. Perrigo Company",
                "product": "Dextromethorphan Hydrobromide, Guaifenesin",
                "price": "73.09",
                "fda_date_approved": "03/02/2016"
            }
];
var genericObjects = [];
var table = document.getElementById('table');
var rootGenericObject = new Object();
var sortDirection = "Desc";
var sortColumn = "";

if (genericDatas instanceof Array) {
    convertDataToObjects();
    populateTableHeaderss();
    populateTableDatas();

} else {
    console.log('Not an valid data');
}

function convertDataToObjects() {
    for(let genericData of genericDatas) {
        var genericObject = new Object();
        Object.keys(genericData).forEach(function (key) {
            if (!genericObject.hasOwnProperty(key)) {
                genericObject[key] = genericData[key];
                rootGenericObject[key] = "";
            }
        });
        genericObjects.push(genericObject);
    }
}

function populateTableHeaderss() {
    var tr = document.createElement('tr');
    Object.keys(rootGenericObject).forEach(function (key) {
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(key));
        th.addEventListener("click", function () {
            sortTable(key);
        }, false);
        tr.appendChild(th);
    });
    table.appendChild(tr);
}

function populateTableDatas() {
    for(let genricDataObj of genericObjects) {
        var tr = document.createElement('tr');
        Object.keys(rootGenericObject).forEach(function (key) {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(genricDataObj[key]));
            tr.appendChild(td);
        });
        table.appendChild(tr);
    }
}

function sortTable(key) {
    if (sortColumn !== key) {
        sortColumn = key;
        sortDirection = "Desc";
    }
    else if (sortDirection === "Asc") {
        sortDirection = "Desc";
    }
    else if (sortDirection === "Desc") {
        sortDirection = "Asc";
    }

    genericObjects.sort(function (a, b) {
        var value1 = a[key];
        var value2 = b[key];
        if (sortDirection === "Asc") {
            return sortAsc(value1, value2);
        } else {
            return sortDesc(value1, value2);
        }
    });

    removeChilds();
    populateTableDatas();
}

function sortAsc(value1, value2) {
    if (!isNaN(value1) || !isNaN(value2)) {
        if (value1 === undefined || value2 === undefined) {
            return handleUndefinedSort(value1, value2);
        }
        return value1 - value2;
    }
    else if (isValidDate(value1) || isValidDate(value2)) {
        if (value1 === undefined || value2 === undefined) {
            return handleUndefinedSort(value1, value2);
        }
        var dateA = new Date(parseDate(value1));
        var dateB = new Date(parseDate(value2));
        if (dateA < dateB) {
            return -1;
        } else if (dateA > dateB) {
            return 1;
        } else {
            return 0;
        }
    }
    else {
        if (value1 === undefined || value2 === undefined) {
            return handleUndefinedSort(value1, value2);
        } else if (value1.toString().toLowerCase() < value2.toString().toLowerCase()) {
            return -1;
        } else if (value1.toString().toLowerCase() > value2.toString().toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    }
}

function sortDesc(value1, value2) {
    if (!isNaN(value1) || !isNaN(value2)) {
        if (value1 === undefined || value2 === undefined) {
            return handleUndefinedSort(value1, value2);
        }
        return value2 - value1;
    }
    else if (isValidDate(value1) || isValidDate(value2)) {
        if (value1 === undefined || value2 === undefined) {
            return handleUndefinedSort(value1, value2);
        }
        var dateA = new Date(parseDate(value1));
        var dateB = new Date(parseDate(value2));
        if (dateA > dateB) {
            return -1;
        } else if (dateA < dateB) {
            return 1;
        } else {
            return 0;
        }
    }
    else {
        if (value1 === undefined || value2 === undefined) {
            return handleUndefinedSort(value1, value2);
        } else if (value1.toString().toLowerCase() > value2.toString().toLowerCase()) {
            return -1;
        } else if (value1.toString().toLowerCase() < value2.toString().toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    }
}

function handleUndefinedSort(value1, value2) {
    if (value1 === undefined && value2 === undefined) {
        return 0;
    } else if (value1 === undefined) {
        return 1;
    } else if (value2 === undefined) {
        return -1;
    }
}

function removeChilds() {
    var tableRows = table.getElementsByTagName('tr');
    var rowCount = tableRows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        table.removeChild(tableRows[x]);
    }
}

function isValidDate(value) {
    if (value === undefined) {
        return false;
    }
    var convertedDate = parseDate(value);
    if (convertedDate == null) {
        return false;
    }
    return true;
}

function parseDate(value) {
    if (!value.toString().includes('/')) {
        return null;
    }
    var parts = value.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

