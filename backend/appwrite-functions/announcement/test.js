
const axios = require('axios')

const auth_header = {
    'X-Appwrite-Project': '618a936863851',
    'X-Appwrite-Key': '51e5d586ba1ffa8e3b5c00147e0f788344bd49a2a67dff85b6dee5d3c44f46435e824fc4c2738334b3a22a3673c13db53109acab2d5defb59f3c8e6b51433f82ac1fdb69a3aac09d29fdfb13af3105f67791626c2c6316a9d04e150e0c7c6947a45b13f7f5c107e48552053ba74f31b3b8a65b9c3862cb9cae0095b33c66b2ed'
}

const delay = ms => new Promise(res => setTimeout(res, ms));
post_data = {
    "getAnnouncements": true,
    "numberOfAnnouncements": 3,
    "timestamp": 1637100904,
    "after": true
}
const getAnnouncements = async () => {
    try {
        const res_pos = await axios.post('http://localhost:80/v1/functions/61939abd51018/executions', post_data, {headers: auth_header})
        console.log(res_pos.data)
        await delay(1000)
        if (res_pos.status == 201) {
            const get_url = 'http://localhost/v1/functions/61939abd51018/executions/' + String(res_pos.data['$id'])
            console.log(get_url)
            const res = await axios.get(get_url, {headers: auth_header})
            console.log(res.data)
            //
            // const obj = JSON.parse(res.data.stdout)
            // console.log(obj.currentTimeStamp)
        }
    } catch (err) {
        console.log(err)
    }
}
getAnnouncements()
