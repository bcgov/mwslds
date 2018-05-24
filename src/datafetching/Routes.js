
const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'
const MINES_ROUTE = 'mines'
const TOKEN_URL = 'https://i1api.nrs.gov.bc.ca/oauth2/v1/oauth/token?disableDeveloperFilter=true&grant_type=client_credentials&scope=MWSL_COMMONMINES_API.*'

export { BASE_URL }
export { MINES_ROUTE }
export { TOKEN_URL }
export default {
  BASE_URL,
  MINES_ROUTE,
  TOKEN_URL,
}
