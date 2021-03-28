import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/book',
    component: Layout,
    redirect: '/book/table',
    name: 'Book',
    meta: {title: 'Book Management', icon: 'table'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/book/book'),
        meta: {title: 'Book Management', icon: 'table'}
      },
      {
        path: 'chapter/:id',
        name: 'Chapter',
        component: () => import('@/views/book/chapter'),
        meta: {title: 'Chapter Management', icon: 'table'},
        hidden: true
      },
      {
        path: 'section/:id',
        name: 'Section',
        component: () => import('@/views/book/section'),
        meta: {title: 'Section Management', icon: 'table'},
        hidden: true
      },
      {
        path: 'sectionEdit/:id',
        name: 'SectionEdit',
        component: () => import('@/views/book/sectionEdit'),
        meta: {title: 'Section Editing', icon: 'table'},
        hidden: true
      },
    ]
  },
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/index',
    name: 'Blog',
    meta: {title: 'Blog Management', icon: 'form'},
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/blog/index'),
        meta: {title: 'Blog List', icon: 'form'}
      },
      {
        path: 'blogEdit/:id',
        name: 'BlogEdit',
        component: () => import('@/views/blog/blogEdit'),
        meta: {title: 'Blog Editing', icon: 'form'},
        hidden: true
      }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/index',
    name: 'Resource',
    meta: {title: 'Download', icon: 'table'},
    children: [
      {
        path: 'index',
        name: 'Resource',
        component: () => import('@/views/download/index'),
        meta: { title: 'Download', icon: 'tree' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    name: 'Admin',
    meta: {title: 'Admin Management', icon: 'user'},
    children: [
      {
        path: 'index',
        name: 'Admin',
        component: () => import('@/views/admin/index'),
        meta: { title: 'Admin Management', icon: 'user' }
      }
    ]
  },
  {
    path: '/video',
    component: Layout,
    redirect: '/video/idnex',
    name: 'Video',
    meta: {title: 'Video management', icon: 'eye-open'},
    children: [
      {
        path: 'index',
        name: 'Video',
        component: () => import('@/views/video/index'),
        meta: {title: 'Video Management', icon: 'eye-open'}
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
