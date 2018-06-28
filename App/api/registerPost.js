let POST = {};

POST.registerUser = async function (data, callback) {
    fetch('http://172.20.10.6:4000/register-user', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json()
    ).then((res) => {
        callback(undefined, res);
    })
}

POST.sendOk = (data, callback) => {
    fetch('http://172.20.10.6:4000/confirm-notify', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json()
    ).then((res) => {
        callback(undefined, res);
    })
}

POST.elderlyDetails = (data, callback) => {
    fetch('http://172.20.10.6:4000/register-elderly', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json()
    ).then((res) => {
        callback(undefined, res);
    })
}
POST.addContacts = (data, callback) => {
    fetch('http://172.20.10.6:4000/add-contacts', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json()
    ).then((res) => {
        callback(undefined, res);
    })
}


POST.registerDevice = (data, callback) => {
    fetch('http://172.20.10.6:4000/register-device', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json()
    ).then((res) => {
        callback(undefined, res);
    })
}
export { POST }