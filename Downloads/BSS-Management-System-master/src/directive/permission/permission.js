import store from '@/store'
//
// export default{
//   inserted(el, binding, vnode) {
//     const { value } = binding
//     const roles = store.getters && store.getters.roles
//
//     if (value && value instanceof Array && value.length > 0) {
//       const permissionRoles = value
//       const hasPermission = roles.some(role => {
//         return permissionRoles.includes(role)
//       })
//
//       if (!hasPermission) {
//         el.parentNode && el.parentNode.removeChild(el)
//       }
//     } else {
//       throw new Error('need roles!')
//     }
//   }
// }

export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    let roles = [];
    if (localStorage.getItem('Permission')) {
      roles = localStorage.getItem('Permission').split(',')
    } else {
      localStorage.clear()
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('need roles!')
    }
  }
}

