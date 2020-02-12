import React                      from 'react'
import Table, {useTableComponent} from '../../../components/Table/Table'
import {useQuery}                 from '@apollo/react-hooks'
import {QUERY}    from '../../graphQL'

const Dashboard = () => {

  const header = React.useMemo(() => [
    {
      field: 'userName',
      cell: {
        classes: ['hw-table-cell-center'],
      }
    },
    {
      field: 'email',
      cell: {
        classes: ['hw-table-cell-center'],
      }
    },
    {
      field: 'status',
      cell: {
        classes: ['hw-table-cell-center'],
        format: (value : any) => {
          switch (value) {
            case 0: return 'REGISTERED'
            case 1: return 'ACTIVE'
            default: return 'NOT'
          }
        }
      }
    },
    {
      label: 'created',
      field: 'createdAt',
      sortable: true,
      cell: {
        classes: ['hw-table-cell-center'],
        format: (value : any) => {
          return new Date(value).toLocaleString(void(0),{dateStyle: 'short', timeStyle:'short'} as any)
        }
      }
    },
    {
      label: 'modified',
      field: 'updatedAt',
      cell: {
        classes: ['hw-table-cell-center'],
        format: (value : any) => {
          return new Date(value).toLocaleString(void(0),{dateStyle: 'short', timeStyle:'short'} as any)
        }
      }
    }
  ],[])

  const {setSorting,tableState} = useTableComponent()

  const { loading, error, data }  = useQuery(QUERY.Account.accounts,{
    variables: {
      offset: 0,
      limit: 1000
    }
  })

  const dataTable : any = data && data.data && data.data.items ? data.data.items : []

  return (
    <div>
      <Table
          header={header}
          data={dataTable}
          separator={'cell'}
          tableComponentState={tableState}
          setSorting={setSorting}
      />

    </div>
  )
}

export  default  Dashboard
