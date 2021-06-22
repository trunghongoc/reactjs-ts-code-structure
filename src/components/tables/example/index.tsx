import { FC, useState } from 'react'
import { Table } from 'antd'
import './style.scss'

import { data as MOCK_DATA } from './data'

import { Props, SortOrderType, PaginationType } from './type'

export const ExampleTable: FC<Props> = (): JSX.Element => {
  const [data] = useState(MOCK_DATA)
  const [loading] = useState<boolean>(false)

  /*
  const [pagination] = useState<PaginationType>({
    current: 1,
    pageSize: 10
  })
  */

  const [, setSortedInfo] = useState<SortOrderType>({
    columnKey: '',
    order: ''
  })

  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // sorter: (a: any, b: any): number => a.name.length - b.name.length,
      // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      sorter: true
      // ellipsis: true
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
      // sorter: (a: any, b: any): number => a.age - b.age,
      // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      // ellipsis: true
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: true
      // sorter: (a: any, b: any): number => a.address.length - b.address.length,
      // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      // ellipsis: true
    }
  ]

  const handleChange: any = (
    paging: PaginationType,
    filters: any,
    sorter: any
  ): void => {
    // tslint:disable-next-line
    console.log('Various parameters', { paging, filters, sorter })

    setSortedInfo({
      columnKey: sorter.columnKey,
      order: sorter.order
    })
  }

  return (
    <div className="ant-table-custom">
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        showSorterTooltip={false}
        loading={loading}
        rowClassName={(record: any, index: number): string =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
      />
    </div>
  )
}

export default ExampleTable
