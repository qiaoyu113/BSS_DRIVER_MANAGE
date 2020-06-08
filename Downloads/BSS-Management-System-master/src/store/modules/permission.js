import { asyncRouterMap, constantRouterMap } from '@/router'
import store from '@/store'
// import { GetUserRouter } from '@/api/login'
// import Layout from '@/views/layout/Layout'
// import Components from '@/utils/componentRouter'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// var typeRouter = true;

function isInArray(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true;
    }
  }
  return false;
}

function hasPermission(roles, route) {
  let roleArr = [];
  if (localStorage.getItem('Permission')) {
    roleArr = localStorage.getItem('Permission').split(',')
  } else {
    localStorage.clear()
    store.dispatch('FedLogOut').then(() => {
      location.reload() // 为了重新实例化vue-router对象 避免bug
    })
  }
  if (route.apiUrl === 'root') {
    return true
  }
  if (isInArray(roleArr, route.apiUrl)) {
    // if (typeRouter) {
    //   route.path = '';
    //   typeRouter = false;
    // }
    return true
  } else {
    return false;
  }
  // if (route.meta && route.meta.roles) {
  //   return roles.some(role => route.meta.roles.includes(role))
  // } else {
  //   return true
  // }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

// function generaMenu(data) {
//   let arr = []
//   data.forEach(item => {
//     let menu = {
//       path: item.path,
//       component: Layout,
//       redirect: item.redirect ? item.redirect : '/',
//       name: item.name,
//       meta: { title: item.meta.title, icon: item.meta.icon, noCache: item.meta.noCache, affix: item.meta.affix },
//       children: generaMenuChildren(item.children)
//     }
//     arr.push(menu)
//   })
//   return arr
// }
//
// function generaMenuChildren(data) {
//   data.forEach(i => {
//     console.log(Components)
//     if (i.name in Components) {
//       i.component = Components[i.name];
//     } else {
//       i.component = '/';
//     }
//   })
//   return data
// }

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('admin')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        let Arr_new = []
        accessedRouters.forEach(route => {
          if (route.children && route.children.length) {
            Arr_new.push(route)
          }
        })
        Arr_new[0].path = '/'
        commit('SET_ROUTERS', Arr_new)
        resolve()
        // GetUserRouter(
        //   {
        //     role: 123
        //   }
        // ).then(response => {
        //   if (response.status === 200) {
        //     let data = response.data
        //     data = generaMenu(data)
        //     let accessedRouters = []
        //     if (roles.includes('admin')) {
        //       accessedRouters = data
        //     } else {
        //       accessedRouters = data
        //       console.log(accessedRouters)
        //       accessedRouters = filterAsyncRouter(accessedRouters, roles)
        //     }
        //     console.log(accessedRouters)
        //     commit('SET_ROUTERS', accessedRouters)
        //     resolve()
        //   }
        // })
      })
    }
  }
}

export default permission
