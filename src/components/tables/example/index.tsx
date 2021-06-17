import { FC, useState, useMemo } from 'react'
import { Table } from 'antd'

import { data as MOCK_DATA } from './data'

import { Props, SortOrderType } from './type'

export const ExampleTable: FC<Props> = (): JSX.Element => {
  const [data] = useState(MOCK_DATA)
  const [sortedInfo, setSortedInfo] = useState<SortOrderType>({
    columnKey: '',
    order: ''
  })

  const columns: any = useMemo((): any => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: any, b: any): number => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a: any, b: any): number => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        ellipsis: true
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        sorter: (a: any, b: any): number => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        ellipsis: true
      }
    ]
  }, [sortedInfo])

  const handleChange: any = (
    pagination: any,
    filters: any,
    sorter: any
  ): void => {
    // console.log('Various parameters', { pagination, filters, sorter })

    setSortedInfo({
      columnKey: sorter.columnKey,
      order: sorter.order
    })
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        showSorterTooltip={false}
      />
    </>
  )
}

export default ExampleTable
