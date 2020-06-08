export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    let roles = ''
    if (localStorage.getItem('role')) {
      roles = localStorage.getItem('role').split(',')
      roles.forEach((res, index) => {
        if (Number(res)) {
          roles[index] = 'pt'
        } else {
          roles[index] = 'wt'
        }
      })
      if (value) {
        const permissionRoles = value
        const hasRole = roles.some(role => {
          return permissionRoles.includes(role)
        })
        if (!hasRole) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
