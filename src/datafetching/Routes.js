
const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'
const MINES_ROUTE = 'mines'
<<<<<<< HEAD
const TOKEN_URL = 'https://i1api.nrs.gov.bc.ca/oauth2/v1/oauth/token?disableDeveloperFilter=true&grant_type=client_credentials&scope=MWSL_COMMONMINES_API.*'
const NOTICESOFWORK_ROUTE = 'noticesofwork'
const GOVDELAY_ROUTE = 'noticesofwork/governmentdelays'
=======
const TOKEN_URL = 'https://i1api.nrs.gov.bc.ca/oauth2/v1/oauth/token?disableDeveloperFilter=true&grant_type=client_credentials&scope=MWSL_COMMONMINES_API.*,MWSL_REPORTS_API.*'
const LOGIN_URL = 'https://i1auth.nrs.gov.bc.ca/pub/webade-oauth2/oauth/authorize?response_type=token&client_id=DMOD_UI'
>>>>>>> 036ae3e3ac21244253b7d031ac9c83cf8b2294f0

export { BASE_URL }
export { MINES_ROUTE }
export { TOKEN_URL }
<<<<<<< HEAD
export { NOTICESOFWORK_ROUTE }
export { GOVDELAY_ROUTE }

=======
export { LOGIN_URL }
>>>>>>> 036ae3e3ac21244253b7d031ac9c83cf8b2294f0
export default {
  BASE_URL,
  MINES_ROUTE,
  TOKEN_URL,
<<<<<<< HEAD
  NOTICESOFWORK_ROUTE,
  GOVDELAY_ROUTE,
=======
  LOGIN_URL,
>>>>>>> 036ae3e3ac21244253b7d031ac9c83cf8b2294f0
}
