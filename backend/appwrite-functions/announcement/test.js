
const axios = require('axios')

const auth_header = {
    'X-Appwrite-Project': process.env.APPWRITE_PROJECT,
    'X-Appwrite-Key': process.env.APPWRITE_API_KEY
}

const delay = ms => new Promise(res => setTimeout(res, ms));
add_data = {
    "getAnnouncements": false,
    "addAnnouncements": true,
    "announcements": [
        "Message 7 added from HTTP request",
        "Message 8 added from HTTP request"
    ]
}
const addAnnouncements = async () => {
    try {
        const res_pos = await axios.post(
            'http://localhost:80/v1/functions/61939abd51018/executions', 
            {"data": JSON.stringify(add_data)}, 
            {headers: auth_header}
        )
        console.log(res_pos.data)
        const get_url = 'http://localhost/v1/functions/61939abd51018/executions/' + String(res_pos.data['$id'])
        let res_get
        do {
            console.log("Fetch result ...")
            await delay(100)
            res_get = await axios.get(get_url, {headers: auth_header})
        } while (res_get.data.status != 'completed')
        console.log(res_get.data)
    } catch (err) {
        console.log(err)
    }
}
addAnnouncements()

get_data = {
    "getAnnouncements": true,
    "addAnnouncements": false,
    "numberOfAnnouncements": 3,
    "timestamp": 1637100904,
    "after": true
}
const getAnnouncements = async () => {
    try {
        const res_pos = await axios.post(
            'http://localhost:80/v1/functions/61939abd51018/executions', 
            {"data": JSON.stringify(get_data)}, 
            {headers: auth_header}
        )
        console.log(res_pos.data)
        await delay(1000)
        if (res_pos.status == 201) {
            const get_url = 'http://localhost/v1/functions/61939abd51018/executions/' + String(res_pos.data['$id'])
            console.log(get_url)
            let res_get
            do {
                console.log("Fetch result ...")
                await delay(100)
                res_get = await axios.get(get_url, {headers: auth_header})
            } while (res_get.data.status != 'completed')
            console.log(res_get.data)
        }
    } catch (err) {
        console.log(err)
    }
}
getAnnouncements()
