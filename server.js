const express = require('express')
const request = require('request-promise')

const TOKEN_URL = 'https://i1api.nrs.gov.bc.ca/oauth2/v1/oauth/token?disableDeveloperFilter=true&grant_type=client_credentials&scope=MWSL_COMMONMINES_API.*,MWSL_REPORTS_API.*'

const app = express()
const port = process.env.PORT || 5000

const username = process.env.MWSL_USER
const pass = process.env.MWSL_PASS

app.get('/token', (req, res) => {
  request.get(TOKEN_URL).auth(username, pass)
    .then((resp) => {
      const parsed = JSON.parse(resp)
      res.send({ token: parsed.access_token })
    })
    .catch((error) => {
      console.log(error)
      res.send({ error })
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
