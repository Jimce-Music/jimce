// For demonstration-purposes only, published in the README.md
import * as api from '.'

// Set config
api.setConfig({
    baseUrl: 'https://localhost:8080',
    // You could also set default headers (maybe after the auth)
    headers: {
        Authorization: 'Bearer <token>'
    }
})

// Then make a request (fictional routes used here):
const { data: token } = await api.getTestJwt()

const req = await api.postApiTestOapi({
    body: {
        jobId: '123456'
    }
})
console.log(req.error)
console.log(req.data?.jobId)
