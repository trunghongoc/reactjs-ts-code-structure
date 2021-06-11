import { FC } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'

const { Header, Content, Footer } = Layout

type Props = {} | undefined

export const Counter: FC<Props> = (): JSX.Element => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          {new Array(15).fill(null).map((_: any, index: number): any => {
            const key: number = index + 1
            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>
          })}
        </Menu>
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">Content</div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}
