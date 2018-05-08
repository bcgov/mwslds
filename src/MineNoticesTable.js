import withToken from './Token'
import { tableWithData } from './BaseTable'

const route = 'minenotices?nowStatus=PENDING_APPROVAL'
const payloadValue = 'minesNotices'

export default withToken(tableWithData(route, payloadValue))
