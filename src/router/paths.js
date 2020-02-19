/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    view: 'aDashboard'
  },
  {
    path: '/Dashboarde',
    name: 'Dashboard',
    view: 'Dashboard'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/UserManagement',
    name: 'UserManagement',
    view: 'UserManagement'
  },
  {
    path: '/test',
    name: 'test',
    view: 'test'
  },
  {
    path: '/LastMovie',
    name: 'LastMovie',
    view: 'LastMovie'
  }
]
