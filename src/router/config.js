import TabsView from '@/layouts/tabs/TabsView'
import BlankView from "../layouts/BlankView";

let rootModules = [
    {
        path: '/',
        name: '演示路由',
        meta: {
            icon: 'menu',
        },
        component: TabsView,
        redirect: '/login',
        children: [
            {
                path: 'demo',
                name: '演示页面',
                component: () => import('@/pages/demo'),
            }
        ]
    },
]

// 路由配置
const options = {
    routes: [
        {
            path: '/login',
            name: '登录页',
            component: () => import('@/pages/login')
        },
        {
            path: '*',
            name: '404',
            component: () => import('@/pages/exception/404'),
        },
        {
            path: '/403',
            name: '403',
            component: () => import('@/pages/exception/403'),
        },
        {
            path: '/',
            name: '首页',
            component: TabsView,
            redirect: '/login',
            children: rootModules,
        }
    ]
}

export default options
