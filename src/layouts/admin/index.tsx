import { FC, Suspense, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Layout, Menu, Breadcrumb, Affix } from 'antd'
// import { DownOutlined } from '@ant-design/icons'
// import { StoreType } from './redux/type'
import { UserType } from './../../types/user'
import './style.scss'

import { Switch, Route, useHistory } from 'react-router-dom'

import { RouterItemType } from './../../router/type'
import { routers } from './../../router'

const { Header, Content } = Layout

type Props = {} | undefined

export const AdminLayout: FC<Props> = (): JSX.Element => {
  const history: any = useHistory()
  const user: UserType = useSelector(
    (state: any): UserType => state.user.currentUser
  )
  const navigateTo: any = (path: string): void => {
    history.push(path)
  }

  const isLogedIn: boolean = useMemo((): boolean => {
    return user && !!user.id
  }, [user])

  const layoutClass: string = useMemo((): string => {
    return isLogedIn ? 'admin-layout -is-logedin' : 'admin-layout'
  }, [isLogedIn])

  return (
    <div className={layoutClass}>
      <Layout className="layout">
        {isLogedIn && (
          <Affix offsetTop={0}>
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['home']}
              >
                <Menu.Item key="home" onClick={(): void => navigateTo('/')}>
                  Dashboard
                </Menu.Item>

                <Menu.Item
                  key="roles"
                  onClick={(): void => navigateTo('/roles')}
                >
                  Roles
                </Menu.Item>

                <Menu.Item
                  key="operators"
                  onClick={(): void => navigateTo('/operators')}
                >
                  Operators
                </Menu.Item>

                <Menu.Item
                  key="audit-trail"
                  onClick={(): void => navigateTo('/audit-trail')}
                >
                  Audit trail
                </Menu.Item>

                <Menu.Item
                  key="corporates"
                  onClick={(): void => navigateTo('/corporates')}
                >
                  Corporates
                </Menu.Item>

                <Menu.Item
                  key="payroll-payment-report"
                  onClick={(): void => navigateTo('/payroll-payment-report')}
                >
                  Payroll payment report
                </Menu.Item>

                <Menu.Item
                  key="workers"
                  onClick={(): void => navigateTo('/workers')}
                >
                  Workers
                </Menu.Item>

                <Menu.Item
                  key="hub-account"
                  onClick={(): void => navigateTo('/hub-account')}
                >
                  Hub account
                </Menu.Item>

                <Menu.Item
                  key="spoke-account"
                  onClick={(): void => navigateTo('/spoke-account')}
                >
                  Spoke account
                </Menu.Item>

                <Menu.Item
                  key="onboard-new-corporate"
                  onClick={(): void => navigateTo('/onboard-new-corporate')}
                >
                  Onboard new corporate
                </Menu.Item>

                <Menu.Item
                  key="notifications"
                  onClick={(): void => navigateTo('/notifications')}
                >
                  Notifications
                </Menu.Item>

                <Menu.Item
                  key="export-reports"
                  onClick={(): void => navigateTo('/export-reports')}
                >
                  Export reports
                </Menu.Item>
              </Menu>
            </Header>
          </Affix>
        )}

        <Content>
          {isLogedIn && (
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
          )}

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
                        {(router.isPrivate && isLogedIn && <Page />) ||
                          (!router.isPrivate && <Page />)}
                      </Route>
                    )
                  }
                )}
              </Switch>
            </Suspense>
          </div>
        </Content>
      </Layout>
    </div>
  )
}
