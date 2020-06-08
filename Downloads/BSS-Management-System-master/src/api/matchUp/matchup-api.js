import request from '@/utils/request'

/* 获取线路销售列表 */
export function fetchLineSales(data) {
  return request({
    url: '/api/base/user/bss/sys/getLineSaleManager',
    method: 'get'
  })
}

/* 获取加盟经理列表 */
export function fetchJoinMgr(data) {
  return request({
    url: '/api/base/user/bss/sys/getDriverDevelopmentManager',
    method: 'get'
  })
}

/* 获取司机列表-加盟主导 */
export function fetchDriverList(data) {
  return request({
    url: '/api/bss/v1/bss/match/selectDriverIntentionListByQuery',
    method: 'post',
    data
  })
}

/* 获取线路列表-加盟主导 */
export function fetchLineList(data) {
  return request({
    url: '/api/bss/v1/bss/match/selectLineScoreListByQuery',
    method: 'post',
    data
  })
}

/* 获取司机列表-外线主导 */
export function fetchOutDriverList(data) {
  return request({
    url: '/api/bss/v1/bss/match/outline/selectDriverScoreListByQuery',
    method: 'post',
    data
  })
}

/* 获取线路列表-外线主导 */
export function fetchOutLineList(data) {
  return request({
    url: '/api/bss/v1/bss/match/outline/selectLineListByQuery',
    method: 'post',
    data
  })
}

/* 撮合推荐 */
export function recommend(data) {
  return request({
    url: '/api/match/corp/match/bss/createDriverMatchRecord?driverId=' + data.driverId + '&lineId=' + data.lineId,
    method: 'get'
  })
}

/* 获取撮合跟进列表 */
export function fetchFollowList(data) {
  return request({
    url: '/api/bss/v1/bss/match/follow/selectListByQuery',
    method: 'post',
    data
  })
}

/* 获取城市列表 */
export function fetchCity() {
  return request({
    url: '/api/base/base/dict/sys/getCityInfoByPermission',
    method: 'get'
  })
}

/* 获取排序列表 */
export function fetchSort() {
  return new Promise((resolve, reject) => {
    try {
      let list = [{
        id: 1,
        name: '推送最多'
      }, {
        id: 2,
        name: '看活最多'
      }, {
        id: 3,
        name: '试跑最多'
      }, {
        id: 4,
        name: '上手最多'
      }, {
        id: 5,
        name: '失败最多'
      }, {
        id: 6,
        name: '成功率从高到低'
      }, {
        id: 7,
        name: '失败率从高到低'
      }, {
        id: 8,
        name: '成功率从低到高'
      }, {
        id: 9,
        name: '失败率从低到高'
      }]
      let res = {
        success: true,
        data: list
      }
      resolve({ data: res })
    } catch (e) {
      reject('失败')
    }
  })
}

/* 获取统计列表 */
export function fetchStatistics(data) {
  return request({
    url: '/api/datacenter/match/statistics/joinMgr?isMock=true',
    method: 'post',
    data
  })
  // return new Promise((resolve, reject) => {
  //   console.log('sale mgr params: ', data)
  //   try {
  //     let list = [
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       },
  //       {
  //         id: 1,
  //         name: '薛燕霞',
  //         push: 85,
  //         look: 70,
  //         running: 53,
  //         upHand: 20,
  //         fail: 65,
  //         failRate: 21,
  //         succRate: 79,
  //         group: '北京共享一组',
  //         groupRole: 'BGL'
  //       }
  //     ]
  //     let res = {
  //       success: true,
  //       data: list,
  //       page: {
  //         total: 50,
  //         limit: 10
  //       }
  //     }
  //     setTimeout(() => {
  //       resolve({ data: res })
  //     }, 200)
  //   } catch (e) {
  //     reject('失败')
  //   }
  // })
}

/* 导出统计 */
export function exportFile(data) {
  // return request({
  //   url: '/api/bss/v1/bss/line/customer/selectListByKey',
  //   method: 'get',
  //   responseType: 'blob',
  //   data
  // })
  return new Promise((resolve, reject) => {
    try {
      let res = {
        success: true,
        data: 'success',
        page: {
          total: 50,
          limit: 10
        }
      }
      setTimeout(() => {
        resolve({ data: res })
      }, 200)
    } catch (e) {
      reject('失败')
    }
  })
}
