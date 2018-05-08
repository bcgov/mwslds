import withToken from './Token'
import { tableWithData } from './BaseTable'

const route = 'inspectors?regionCode=1'
const payloadValue = 'inspectors'

export default withToken(tableWithData(route, payloadValue))
