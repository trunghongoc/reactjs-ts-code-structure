import { FC, useRef } from 'react'
import { Tabs } from 'antd'
import './style.scss'

import { Props } from './type'

const { TabPane } = Tabs

export const OvalTab: FC<Props> = (): JSX.Element => {
  const ref: any = useRef()

  const callback: any = (key: string): void => {
    // tslint:disable-next-line
    console.log(key)
  }

  const handleOnClickTab: any = (key: string, event: MouseEvent): void => {
    // const tabs: any = event.target.closest('')
    // console.log(tabs)
  }

  return (
    <div ref={ref}>
      <Tabs
        defaultActiveKey="1"
        onChange={callback}
        onTabClick={handleOnClickTab}
        className="oval-tabs"
      >
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>

        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>

        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>

        <TabPane tab="Tab 4" key="4">
          Content of Tab Pane 4
        </TabPane>

        <TabPane tab="Tab 5" key="5">
          Content of Tab Pane 5
        </TabPane>
      </Tabs>
    </div>
  )
}

export default OvalTab
