import { FC, Suspense, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Layout, Menu, Breadcrumb, Affix } from 'antd'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons'
// import { StoreType } from './redux/type'
import { UserType } from './../../types/user'
import './style.scss'

import { Switch, Route, useHistory } from 'react-router-dom'

import { RouterItemType } from './../../router/type'
import { routers } from './../../router'
import AuthService from './../../services/user/auth.service'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

type Props = {} | undefined

export const AdminLayout: FC<Props> = (): JSX.Element => {
  const history: any = useHistory()
  const user: UserType = useSelector(
    (state: any): UserType => state.user.currentUser
  )
  const [collapsed, setCollapsed] = useState(false)

  const isLogedIn: boolean = useMemo((): boolean => {
    return user && !!user.id
  }, [user])

  const userName: string = useMemo((): string => {
    return isLogedIn && user?.username ? user.username : ''
  }, [isLogedIn, user])

  const className: string = useMemo((): string => {
    return isLogedIn ? 'admin-layout -is-loged-in' : 'admin-layout'
  }, [isLogedIn])

  const toggleCollapse: any = (): void => {
    setCollapsed(!collapsed)
  }

  const navigateTo: any = (path: string): void => {
    history.push(path)
  }

  const logout: VoidFunction = (): void => {
    AuthService.logout()
  }

  return (
    <div className={className}>
      <Layout>
        <span style={!isLogedIn ? { display: 'none' } : {}}>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0
            }}
            trigger={null}
            collapsible={true}
            collapsed={collapsed}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['']}
              defaultOpenKeys={['']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="user" icon={<UserOutlined />} title={userName}>
                <Menu.Item key="user__info">Infomation</Menu.Item>
                <Menu.Item key="user__logout" onClick={logout}>
                  Logout
                </Menu.Item>
              </SubMenu>

              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1" onClick={(): void => navigateTo('/')}>
                  option1
                </Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>

              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        </span>

        <Layout
          className="site-layout"
          style={isLogedIn ? { marginLeft: collapsed ? 80 : 200 } : {}}
        >
          <span style={!isLogedIn ? { display: 'none' } : {}}>
            <Header className="page-header">
              <span style={{ display: 'none' }}>
                {isLogedIn ? (
                  <MenuUnfoldOutlined
                    onClick={toggleCollapse}
                    className="collapsed-icon"
                  />
                ) : (
                  <MenuFoldOutlined
                    onClick={toggleCollapse}
                    className="collapsed-icon"
                  />
                )}
              </span>
            </Header>
          </span>

          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
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
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
