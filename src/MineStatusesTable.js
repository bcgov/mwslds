import withToken from './Token'
import { tableWithData } from './BaseTable'

const route = 'minestatuses'
const payloadValue = 'mineStatuses'

export default withToken(tableWithData(route, payloadValue))
