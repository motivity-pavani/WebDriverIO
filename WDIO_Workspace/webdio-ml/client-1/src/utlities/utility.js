export const arrayToObject = (arr = []) => {
    try {
        const res = arr.reduce((acc, curr) => (acc[curr.key] = curr.value, acc), {});
        return res
    }
    catch (err) {
        console.log("ERROR-arrayToObject", err.message)
        return {};
    }

}
export const arrayToObjectWithEmptyFields = (arr = []) => {
    try {
        return arr.reduce((acc, curr) => (acc[curr] = '', acc), {});
    }
    catch (err) {
        console.log("ERROR-arrayToObjectWithEmptyFields", err.message)
        return {};
    }
}
const types = {
    2: 'TestCaseFixtureSteps',
    3: 'TestCaseSteps',
    4: "TestCaseClosureSteps",
    5: "TestCaseValidationSteps"
}

export const inputDataTypes = [
    'String',
    'Number',
    'Boolean',
    'Date',
    'DateAndTime',
    'Time'
]
export const testCaseBuildPayload = (arr = []) => {
    try {
        const payload = {}
        arr.forEach(step => {
            payload[types[step.type.type_id]] = payload[types[step.type.type_id]] ? payload[types[step.type.type_id]] : {};
            step.methodsList.forEach(row => {
                if (row.type === "action") {
                    let method = addDuplicateMethod(`${row.page_name}_${row.method}`, payload[types[step.type.type_id]])
                    payload[types[step.type.type_id]][method] = filedsBuild(row.fields)
                } else if (row.type === "abstract") {
                    payload[types[step.type.type_id]][row.method] = {}
                    row.fields.forEach(r => {
                        payload[types[step.type.type_id]][row.method][r.original] = filedsBuild(r.fields)
                    })
                    // payload[types[step.type.type_id]][row.method] = filedsBuild(row.fields)
                } else if (row.type === "generic") {
                    let method = addDuplicateMethod(`generic_action`, payload[types[step.type.type_id]])
                    payload[types[step.type.type_id]][method] = {
                        pageName: row.page_name,
                        objectName: row.method,
                        action: row.event
                    }

                }

            })
        })
        return payload;
    }
    catch (err) {
        console.log("ERROR-arrayToObjectWithEmptyFields", err.message)
        return {};
    }
}
const addDuplicateMethod = (key, obj) => {
    let count = 0;
    Object.keys(obj).forEach(x => {
        if (x.includes(key)) {
            count++
        }
    })
    return count ? `${key}_${count}` : key

}

const filedsBuild = (fields) => {
    let params = {}
    fields.forEach(x => {
        params[x.fieldName] = x.value;
    })
    return params;

}

export const treeviewBuildData = (payload) => {
    let list = [];
    let node = 1;
    if (payload.testcasefixturesteps && Object.keys(payload.testcasefixturesteps).length) {
        node++
        let obj = {
            name: "testcasefixturesteps",
            node: node,
            list: []
        }
        Object.keys(payload.testcasefixturesteps).forEach(item => {
            let split = item.split("_");
            node++
            let subobj = {
                name: split[0] + "-" + split[1],
                node: node,
                list: [],

            }
            Object.keys(payload.testcasefixturesteps[item]).forEach(values => {
                node++
                subobj.list.push({
                    node: node,
                    name: values,
                    value: payload.testcasefixturesteps[item][values]
                })

            })
            obj.list.push(subobj)
        })
        list.push(obj)

    }

    if (payload.testcasesteps && Object.keys(payload.testcasesteps).length) {
        node++
        let obj = {
            name: "testcasesteps",
            node: node,
            list: []
        }
        Object.keys(payload.testcasesteps).forEach(item => {
            node++
            let split = item.split("_");
            let subobj = {
                name: split[0] + "-" + split[1],
                node: node,
                list: [],

            }
            Object.keys(payload.testcasesteps[item]).forEach(values => {
                node++
                subobj.list.push({
                    node: node,
                    name: values,
                    value: payload.testcasesteps[item][values]
                })

            })
            obj.list.push(subobj)
        })
        list.push(obj)

    }
    if (payload.testcaseclosuresteps && Object.keys(payload.testcaseclosuresteps).length) {
        node++
        let obj = {
            name: "testcaseclosuresteps",
            node: node,
            list: []
        }
        Object.keys(payload.testcaseclosuresteps).forEach(item => {
            node++
            let split = item.split("_");
            let subobj = {
                name: split[0] + "-" + split[1],
                node: node,
                list: [],

            }
            Object.keys(payload.testcaseclosuresteps[item]).forEach(values => {
                node++
                subobj.list.push({
                    node: node,
                    name: values,
                    value: payload.testcaseclosuresteps[item][values]
                })

            })
            obj.list.push(subobj)
        })
        list.push(obj)

    }

    return list;

}