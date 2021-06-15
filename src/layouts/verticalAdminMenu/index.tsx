import { FC, Suspense, useEffect, useMemo, useState, lazy } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Breadcrumb, Spin } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { StoreType } from './../../redux/type'
import { UserType } from './../../types/user'
import './style.scss'

import { Switch, Route, useHistory } from 'react-router-dom'

import { RouterItemType } from './../../router/type'
import { routers } from './../../router'
// import AuthService from './../../services/user/auth.service'
import { setGlobalSpin } from './../../redux/reducers/spinSlice'

const LeftMenu: FC = lazy((): Promise<any> => import('./Menu'))
const { Header, Content, Sider } = Layout

type Props = {} | undefined

const FallbackLoading: FC<Props> = (): JSX.Element => {
  return (
    <div className="fallback-loading">
      <Spin />
    </div>
  )
}

export const AdminLayout: FC<Props> = (): JSX.Element => {
  const history: any = useHistory()
  const user: UserType = useSelector(
    (state: StoreType): UserType => state.user.currentUser
  )
  const isShowGlobalSpin: boolean = useSelector(
    (state: StoreType): boolean => state.spin.isShowGlobalSpin
  )
  const dispatch: any = useDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const [, setCurrentMenuKeys] = useState<string[] | []>([])

  const isLogedIn: boolean = useMemo((): boolean => {
    return user && !!user.id
  }, [user])

  const className: string = useMemo((): string => {
    return isLogedIn ? 'admin-layout -is-loged-in' : 'admin-layout'
  }, [isLogedIn])

  const toggleCollapse: any = (): void => {
    setCollapsed(!collapsed)
  }

  const navigateTo: any = (activeKey: string, path: string): void => {
    setCurrentMenuKeys([activeKey])

    history.push(path)
  }
  const navigateToWithPrevent: any = (
    event: MouseEvent,
    activeKey: string,
    path: string
  ): void => {
    event.preventDefault()
    navigateTo(activeKey, path)
  }

  useEffect((): void => {
    if (isLogedIn) {
      dispatch(setGlobalSpin(false))
    }
  }, [isLogedIn, dispatch])

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
            {/* defaultSelectedKeys={currentMenuKeys}
            defaultOpenKeys={currentMenuKeys} */}
            <Suspense fallback={<FallbackLoading />}>
              <LeftMenu />
            </Suspense>
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

              <Breadcrumb>
                <Breadcrumb.Item
                  href="/"
                  onClick={(event: any): void =>
                    navigateToWithPrevent(event, 'dashboard', '/')
                  }
                >
                  <HomeOutlined />
                </Breadcrumb.Item>

                <Breadcrumb.Item href="">
                  <span>Dashboard</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Header>
          </span>

          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Suspense fallback={<FallbackLoading />}>
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

        {isShowGlobalSpin && (
          <div className="loading-spin">
            <Spin />
          </div>
        )}
      </Layout>
    </div>
  )
}
