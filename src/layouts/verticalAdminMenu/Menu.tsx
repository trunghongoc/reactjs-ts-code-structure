import { FC, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Menu } from 'antd'
import {
  UserOutlined,
  NotificationOutlined,
  HomeOutlined,
  KeyOutlined,
  TeamOutlined,
  DollarOutlined,
  ContactsOutlined,
  FileExcelOutlined
} from '@ant-design/icons'
import { StoreType } from './../../redux/type'
import { UserType } from './../../types/user'
import './menu.scss'

import AuthService from './../../services/user/auth.service'
import { setGlobalSpin } from './../../redux/reducers/spinSlice'

const { SubMenu } = Menu

type Props = {} | undefined

const LeftMenu: FC<Props> = (): JSX.Element => {
  const history: any = useHistory()
  const dispatch: any = useDispatch()
  const user: UserType = useSelector(
    (state: StoreType): UserType => state.user.currentUser
  )

  const [, setCurrentMenuKeys] = useState<string[] | []>([])

  const isLogedIn: boolean = useMemo((): boolean => {
    return user && !!user.id
  }, [user])

  const userName: string = useMemo((): string => {
    return isLogedIn && user?.username ? user.username : ''
  }, [isLogedIn, user])

  const navigateTo: any = (activeKey: string, path: string): void => {
    setCurrentMenuKeys([activeKey])

    history.push(path)
  }

  const logout: VoidFunction = (): void => {
    setCurrentMenuKeys([])
    dispatch(setGlobalSpin(true))
    AuthService.logout()
  }

  return (
    <div className="metis-menu">
      <Menu
        theme="dark"
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key="user" icon={<UserOutlined />} title={userName}>
          <Menu.Item
            key="user__my-profile"
            onClick={(): void => navigateTo('user__my-profile', '/my-profile')}
          >
            My profile
          </Menu.Item>
          <Menu.Item key="user__change-password">Change password</Menu.Item>

          <Menu.Item key="user__logout" onClick={logout}>
            Logout
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          key="dashboard"
          onClick={(): void => navigateTo('dashboard', '/')}
        >
          <HomeOutlined />
          <span className="menu-item-single">Dashboard</span>
        </Menu.Item>

        <SubMenu key="roles" icon={<KeyOutlined />} title="Roles">
          <Menu.Item
            key="roles__list"
            onClick={(): void => navigateTo('roles__list', '/roles')}
          >
            List
          </Menu.Item>

          <Menu.Item
            key="roles__create"
            onClick={(): void => navigateTo('roles__create', '/roles/create')}
          >
            Create
          </Menu.Item>
        </SubMenu>

        <SubMenu key="operators" icon={<TeamOutlined />} title="Operators">
          <Menu.Item
            key="operators__list"
            onClick={(): void => navigateTo('operators__list', '/operators')}
          >
            List
          </Menu.Item>

          <Menu.Item
            key="operators__create"
            onClick={(): void =>
              navigateTo('operators__create', '/operators/create')
            }
          >
            Create
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          key="notifications"
          onClick={(): void => navigateTo('notifications', '/notifications')}
        >
          <NotificationOutlined />
          <span className="menu-item-single">Notifications</span>
        </Menu.Item>

        <Menu.Item
          key="audit-trail"
          onClick={(): void => navigateTo('audit-trail', '/audit-trail')}
        >
          <DollarOutlined />
          <span className="menu-item-single">Audit trail</span>
        </Menu.Item>

        <Menu.Item
          key="payroll-payment-report"
          onClick={(): void =>
            navigateTo('payroll-payment-report', '/payroll-payment-report')
          }
        >
          <FileExcelOutlined />
          <span className="menu-item-single">Payroll payment report</span>
        </Menu.Item>

        <SubMenu
          key="corporates"
          icon={<ContactsOutlined />}
          title="Corporates"
        >
          <Menu.Item
            key="corporate__list"
            onClick={(): void => navigateTo('corporate__list', '/corporates')}
          >
            List
          </Menu.Item>

          <Menu.Item
            key="corporate__onboard-new-corporate"
            onClick={(): void =>
              navigateTo(
                'corporate__onboard-new-corporate',
                '/corporates/onboard-new-coporate'
              )
            }
          >
            Onboard new corporate
          </Menu.Item>
        </SubMenu>

        <SubMenu key="workers" icon={<TeamOutlined />} title="Workers">
          <Menu.Item
            key="workers__list"
            onClick={(): void => navigateTo('workers__list', '/workers')}
          >
            List
          </Menu.Item>

          <Menu.Item
            key="workers__upload"
            onClick={(): void =>
              navigateTo('workers__upload', '/workers/upload')
            }
          >
            Upload
          </Menu.Item>
        </SubMenu>

        <SubMenu key="hubs-account" icon={<TeamOutlined />} title="Hub account">
          <Menu.Item
            key="hubs-account__list"
            onClick={(): void =>
              navigateTo('hubs-account__list', '/hubs-account')
            }
          >
            List
          </Menu.Item>

          <Menu.Item
            key="hubs-account__transaction-history"
            onClick={(): void =>
              navigateTo(
                'hubs-account__transaction-history',
                '/hubs-account/transaction-history'
              )
            }
          >
            Transaction history
          </Menu.Item>

          <Menu.Item
            key="hubs-account__beneficiaries"
            onClick={(): void =>
              navigateTo(
                'hubs-account__beneficiaries',
                '/hubs-account/beneficiaries'
              )
            }
          >
            Beneficiaries
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="spoke-account"
          icon={<TeamOutlined />}
          title="Spoke account"
        >
          <Menu.Item
            key="spoke-account__list"
            onClick={(): void =>
              navigateTo('spoke-account__list', '/spoke-account')
            }
          >
            List
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="export-report"
          icon={<FileExcelOutlined />}
          title="Export report"
        >
          <Menu.Item
            key="export-report-1"
            onClick={(): void =>
              navigateTo('export-report-1', '/export-report')
            }
          >
            Export
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default LeftMenu
