
const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'
const TOKEN_URL = 'https://i1api.nrs.gov.bc.ca/oauth2/v1/oauth/token?disableDeveloperFilter=true&grant_type=client_credentials&scope=MWSL_COMMONMINES_API.*,MWSL_REPORTS_API.*'
const LOGIN_URL = 'https://i1auth.nrs.gov.bc.ca/pub/webade-oauth2/oauth/authorize?response_type=token&client_id=DMOD_UI'
const LOGOUT_URL = 'https://logontest.gov.bc.ca/clp-cgi/logoff.cgi'

const MINES_ROUTE = 'mines'
const TOKEN_ROUTE = 'token'
const GOVDELAY_ROUTE = 'noticesofwork/governmentdelays'
const NOTICESOFWORK_ROUTE = 'noticesofwork'


export { BASE_URL }
export { TOKEN_URL }
export { LOGIN_URL }
export { LOGOUT_URL }
export { MINES_ROUTE }
export { TOKEN_ROUTE }
export { GOVDELAY_ROUTE }
export { NOTICESOFWORK_ROUTE }

export default {
  BASE_URL,
  TOKEN_URL,
  LOGIN_URL,
  LOGOUT_URL,
  MINES_ROUTE,
  TOKEN_ROUTE,
  GOVDELAY_ROUTE,
  NOTICESOFWORK_ROUTE,
}
