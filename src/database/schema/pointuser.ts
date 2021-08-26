import { tableSchema } from '@nozbe/watermelondb';

const pointUserSchema = tableSchema({
  name: 'routeuserpoints', 
  columns: [
    {
      name: 'lat',
      type: 'string',
    },
    {
      name: 'lng',
      type: 'string',
    },
    {
      name: 'date',
      type: 'number',
    },
  ]
})

export { pointUserSchema }