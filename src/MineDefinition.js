import { isRequired } from './input/Validators'
import { selectTransform } from './datatransform'


const detailFields = [

]
export { detailFields }

const updateFields = [
  {
    name: 'mineName',
    validator: isRequired,
    inputGroup: 0,
    width: 80,
  },
  {
    name: 'alias',
    inputGroup: 1,
    width: 40,
  },
  {
    name: 'mineLocationName',
    inputGroup: 1,
    width: 40,
  },
  {
    name: 'district',
    inputGroup: 2,
    width: 40,
  },
  {
    name: 'mineManager',
    inputGroup: 2,
    width: 40,
  },
  {
    name: 'enteredBy',
    inputGroup: 3,
    width: 40,
    disabled: true,
  },
  {
    name: 'enteredDate',
    inputGroup: 3,
    width: 40,
    disabled: true,
  },
  {
    name: 'permitteeCompanyCode',
    type: 'data-select',
    route: 'companies',
    validator: isRequired,
    transform: selectTransform('companies', 'code', 'code'),
    inputGroup: 4,
    width: 20,
  },
  {
    name: 'regionCode',
    type: 'data-select',
    route: 'regions',
    validator: isRequired,
    transform: selectTransform('regions', 'code', 'code'),
    inputGroup: 4,
    width: 20,
  },
  {
    name: 'mineTypeCode',
    type: 'data-select',
    route: 'minetypes',
    validator: isRequired,
    transform: selectTransform('mineTypes', 'code', 'name'),
    inputGroup: 4,
    width: 20,
  },
  {
    name: 'mineStatusCode',
    type: 'data-select',
    route: 'minestatuses',
    validator: isRequired,
    transform: selectTransform('mineStatuses', 'code', 'name'),
    inputGroup: 4,
    width: 20,
  },
  {
    name: 'major',
    type: 'checkbox',
    inputGroup: 5,
  },
  {
    name: 'underInvestigation',
    type: 'checkbox',
    inputGroup: 5,
  },
  {
    name: 'withIssues',
    type: 'checkbox',
    inputGroup: 5,
  },
]
export { updateFields }

export default {
  updateFields,
  detailFields,
}
