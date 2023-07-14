
exports.checkmethodName = (methodName) => {
    try {
        let nameSplit = methodName.split('_');
        if (nameSplit.length === 2 || nameSplit.length === 3) {
            return {
                page: nameSplit[0],
                method: nameSplit[1]
            }
        }
        else {
            return {
                page: "",
                method: ""
            }
        }
    } catch (err) {
        console.log("METHOD-NAME-CHECK-ERROR", err.message)
    }

}
exports.testcasesTypes = [
    'testcasefixturesteps',
    'testcasesteps',
    'testcaseclosuresteps'
]
exports.checkAbstractMethod = (methods) => {
    let testcaseDetails = null;
    methods.forEach((element, index) => {
        if (element && element.toLowerCase().includes('abstract')) {
            testcaseDetails = {
                testcaseName: element,
                index
            };
        }
    });
    return testcaseDetails;
}
exports.checkGeneric = (method) => {
    return method && method.toLowerCase().includes('generic')

}

exports.arrayInsert = (arr, index, newItem) => {
    arr.splice(index, 1);
    newItem.forEach(row => {
        arr = [
            ...arr.slice(0, index),
            row,
            ...arr.slice(index)
        ]
        index++

    })
    return arr;
}
exports.mergedObj = (obj1, obj2) => {
    let list = Object.keys(obj1);
    list.forEach(x => {
        if (obj2[x]) obj1[x] = { ...obj1[x], ...obj2[x] }
    })
    return obj1;

}
exports.checkReponse = (arry = []) => {
    let resp = true;
    arry.forEach(x => {
        if (!x) {
            resp = false;
        }
    })
    return resp;

}

