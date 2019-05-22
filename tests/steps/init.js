const { promisify } = require('util')
const awscred = require('awscred')
const api_root = 'https://sgub9l85ik.execute-api.us-east-1.amazonaws.com/dev/'
let initialized = false

const init = async () => {
  if (initialized) {
    return
  }

  process.env.TEST_ROOT            = api_root
  process.env.restaurants_api      = process.env.TEST_ROOT + "restaurants"
  process.env.restaurants_table    = "restaurants-jezd"
  process.env.AWS_REGION           = "us-east-1"
  process.env.cognito_user_pool_id = "us-east-1_cAYHcYQXC"
  process.env.cognito_client_id    = "5mqtvug4jekfnve17sm30p6vr4"
  process.env.cognito_server_client_id = "6e8rujvf3ah285ottoia6ugm5c"

  const { credentials } = await promisify(awscred.load)()

  process.env.AWS_ACCESS_KEY_ID     = credentials.accessKeyId
  process.env.AWS_SECRET_ACCESS_KEY = credentials.secretAccessKey

  console.log('AWS credential loaded')

  initialized = true
}



module.exports = {
  init
}