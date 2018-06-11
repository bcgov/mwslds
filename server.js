/* eslint no-console: 0 */

const express = require('express')
const request = require('request-promise')
const path = require('path')
const decode = require('jwt-decode')

const TOKEN_URL = 'https://i1api.nrs.gov.bc.ca/oauth2/v1/oauth/token?disableDeveloperFilter=true&grant_type=client_credentials&scope=MWSL_COMMONMINES_API.*,MWSL_REPORTS_API.*'

const app = express()
const port = process.env.PORT || 5000

const username = process.env.MWSL_USER
const pass = process.env.MWSL_PASS

if (!username || !pass) {
  console.error('FATAL: No MWSL authentication provided, exiting.')
  process.exit(1)
}

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'build')))

app.post('/token', (req, res) => {
  let jwt = null
  try {
    jwt = decode(req.body.auth)
  } catch (err) {
    // failed to decode, invalid token caught below
  }

  const valid = (
    jwt &&
    jwt.cid === 'DMOD_UI' &&
    jwt.client_id === 'DMOD_UI' &&
    jwt.sub &&
    jwt.user_guid &&
    jwt.user_id.startsWith('IDIR')
  )

  if (!valid) {
    console.log(`ERROR: invalid jwt token: ${jwt && jwt.toString()}`)
    res.status(401)
    res.send({ error: 'invalid jwt token' })
  }

  request.get(TOKEN_URL).auth(username, pass)
    .then((resp) => {
      console.log(`Got token for ${jwt.user_id}`)
      const parsed = JSON.parse(resp)
      res.send({ token: parsed.access_token })
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`)
      res.status(500)
      res.send({ error })
    })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => console.log(`Listening on port ${port}`))
