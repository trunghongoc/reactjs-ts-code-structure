import { FC, Suspense } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
// import { StoreType } from './redux/type'
// import { UserType } from './types/user'
import './admin.scss'

import { Switch, Route, useHistory } from 'react-router-dom'

import { RouterItemType } from './../router/type'
import { routers } from './../router'

const { Header, Content } = Layout

type Props = {} | undefined

export const AdminLayout: FC<Props> = (): JSX.Element => {
  const history: any = useHistory()
  const navigateTo: any = (path: string): void => {
    history.push(path)
  }

  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
            <Menu.Item key="home" onClick={(): void => navigateTo('/')}>
              Dashboard
            </Menu.Item>

            <Menu.Item key="about" onClick={(): void => navigateTo('/about')}>
              About
            </Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

          <div className="site-layout-content">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {routers.map(
                  (router: RouterItemType, index: number): JSX.Element => {
                    const Page: FC = router.component

                    return (
                      <Route
                        path={router.path}
                        exact={router.exact}
                        key={index}
                      >
                        <Page />
                      </Route>
                    )
                  }
                )}
              </Switch>
            </Suspense>
          </div>
        </Content>
      </Layout>
    </>
  )
}
