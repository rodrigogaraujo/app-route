import { appSchema } from '@nozbe/watermelondb'

import { userSchema } from './user'
import { pointUserSchema } from './pointuser'

const schemas = appSchema({
  version: 3,
  tables: [
    userSchema,
    pointUserSchema
  ]
})

export { schemas } 