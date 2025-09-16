import { TableHeaders, CenteredHeaders } from './utils'

export function TableHeader() {
  return (
    <thead className='bg-stone-50 text-stone-700'>
      <tr>
        {TableHeaders.map((header) => (
          <th
            key={header}
            className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
              CenteredHeaders.includes(header) ? 'text-center' : 'text-left'
            }`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}
