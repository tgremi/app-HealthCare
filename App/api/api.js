let get = {};

export const getUser = (user) => {
    return fetch(`http://172.20.10.6:4000/getUser/${user}`)
        .then(response => Promise.all([response, response.json()]))
}

export const getNotification = (user) => {
    return fetch(`http://172.20.10.6:4000/get-notification/${user}`)
        .then(response => Promise.all([response, response.json()]))
}


// export default getUser; 