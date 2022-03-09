import Mock from 'mockjs' 

const login = {
  type: 'post',
  url: '/login',
  response: (config) => {
    return {
      code: '0',
      data: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refreshToken: ''
      }
    }
  }
}

const getInfo = {
  type: 'get',
  url: '/getInfo',
  response: (config) => {
    return {
      code: '0',
      data: {
        userId: '101',
        userCode: 'admin',
        userName: '管理员',
        tenantId: '',
        tenantName: '',
        menus: [
          {
            id: 1,
            menuName: '主应用',
            children: [
              {
                id: 11,
                menuName: '页面1',
                routeName: 'page1',
                path: '/page1'
              },
              {
                id: 12,
                menuName: '页面2',
                routeName: 'page2',
                path: '/page2'
              }
            ]
          },
          {
            id: 2,
            menuName: '子应用1',
            children: [
              {
                id: 21,
                menuName: '子应用1-页面1',
                routeName: 'child1',
                path: '/child1/page1'
              },
              {
                id: 22,
                menuName: '子应用1-页面2',
                routeName: 'child1',
                path: '/child1/page2'
              }
            ]
          },

          {
            id: 3,
            menuName: '子应用2',
            children: [
              {
                id: 31,
                menuName: '子应用2-页面1',
                routeName: 'child2',
                path: '/child2/page1'
              },
              {
                id: 32,
                menuName: '子应用2-页面2',
                routeName: 'child2',
                path: '/child2/page2'
              }
            ]
          }
        ],
        permissions: []
      }
    }
  }
}

export default {
  login,
  getInfo
}
