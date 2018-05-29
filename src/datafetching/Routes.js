
const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'
const MINES_ROUTE = 'mines'
const TOKEN_URL = 'https://i1api.nrs.gov.bc.ca/oauth2/v1/oauth/token?disableDeveloperFilter=true&grant_type=client_credentials&scope=MWSL_COMMONMINES_API.*,MWSL_REPORTS_API.*'
const LOGIN_URL = 'https://i1auth.nrs.gov.bc.ca/pub/webade-oauth2/oauth/authorize?response_type=token&client_id=DMOD_UI'

export { BASE_URL }
export { MINES_ROUTE }
export { TOKEN_URL }
export { LOGIN_URL }
export default {
  BASE_URL,
  MINES_ROUTE,
  TOKEN_URL,
  LOGIN_URL,
}
