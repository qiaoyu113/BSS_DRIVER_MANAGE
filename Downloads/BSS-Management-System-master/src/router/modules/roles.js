import Layout from '@/views/layout/Layout'

let userRouter = [

  {
    path: '/custom',
    component: Layout,
    name: '客户管理',
    redirect: '/client-list',
    apiUrl: 'root',
    meta: {
      title: '客户管理',
      icon: 'client'
    },
    children: [
      {
        path: '/client-list',
        component: () => import('@/views/clientList/clientListNew'),
        name: 'ClientListNew',
        meta: { title: '货主列表', icon: '', noCache: true, affix: true },
        apiUrl: '/bss/v1/bss/line/customer/selectListByKey'
      },
      {
        path: '/add-client',
        component: () => import('@/views/clientList/addClient'),
        name: 'AddClient',
        hidden: true,
        meta: { title: '创建货主', icon: '', noCache: true, affix: true },
        apiUrl: '/line/line/customer/save'
      },
      {
        path: '/all-line',
        component: () => import('@/views/carline/allCarLine'),
        name: 'AllCarLine',
        hidden: true,
        meta: { title: '所有线路' },
        apiUrl: '/bss/v1/bss/line/task/ownLineTasks'
      },
      {
        path: '/client-detail',
        component: () => import('@/views/clientList/clientDetail'),
        name: 'ClientDetail',
        hidden: true,
        meta: { title: '货主详情', icon: 'peoples', noCache: true, affix: true },
        apiUrl: '/line/line/customer/info'
      },
      {
        path: '/custom-list',
        component: () => import('@/views/clientList/customListNew'),
        name: 'CustomListNew',
        meta: { title: '客户池列表', icon: '', noCache: false, affix: true },
        apiUrl: '/bss/v1/bss/customer/pool/selectListByQuery'
      },
      {
        path: '/custom-detail',
        component: () => import('@/views/clientList/customDetail'),
        name: 'CustomDetail',
        hidden: true,
        meta: { title: '客户详情', icon: '', noCache: false, affix: true },
        apiUrl: '/line/line/customer/customerPool/detail'
      },
      {
        path: '/custom-log',
        component: () => import('@/views/clientList/customLog'),
        name: 'CustomLog',
        hidden: true,
        meta: { title: '操作日志', icon: '', noCache: false, affix: true },
        apiUrl: '/line/line/task/log/customer/clue/log/list'
      },
      {
        path: '/custom-follow',
        component: () => import('@/views/clientList/customFollow'),
        name: 'CustomFollow',
        hidden: true,
        meta: { title: '跟进', icon: '', noCache: false, affix: true },
        apiUrl: '/line/line/customer/customerPool/follow'
      }
    ]
  },
  {
    path: '/line',
    component: Layout,
    name: '线路管理',
    redirect: '/all-line-list',
    apiUrl: 'root',
    meta: {
      title: '线路管理',
      icon: 'tree'
    },
    children: [
      {
        path: '/all-line-list',
        component: () => import('@/views/carline/allCarLineList'),
        name: 'AllCarLineList',
        meta: { title: '线路总列表' },
        apiUrl: '/bss/v1/bss/line/task/selectListByQuery/all'
      },
      {
        path: '/add-line',
        component: () => import('@/views/carline/addCarLine'),
        name: 'AddCarLine',
        meta: { title: '创建新线路' },
        apiUrl: '/line/line/task/create'
      },
      {
        path: '/add-line-group',
        component: () => import('@/views/carline/addGroupCarLine'),
        name: 'AddGroupCarLine',
        hidden: true,
        meta: { title: '确认线路任务' },
        apiUrl: '/line/line/task/confirmLineTaskClue'
      },
      {
        path: '/pend-line',
        component: () => import('@/views/carline/pendLine'),
        name: 'PendLine',
        meta: { title: '待审核线路' },
        apiUrl: '/bss/v1/bss/line/task/selectListByQuery/WaitApply'
      },
      {
        path: '/vendibility-line',
        component: () => import('@/views/carline/vendibilityLine'),
        name: 'VendibilityLine',
        meta: { title: '可售线路' },
        apiUrl: '/bss/v1/bss/line/task/selectListByQuery/canSell'
      },
      {
        path: '/waitTogether-tender',
        component: () => import('@/views/tender/waitTogetherTender'),
        name: 'WaitTogetherTender',
        meta: { title: '待撮合线路标书' },
        apiUrl: '/bss/v1/bss/tender/selectListByQuery/waitPending'
      },
      {
        path: '/readyTogether-tender',
        component: () => import('@/views/tender/readyTogetherTender'),
        name: 'ReadyTogetherTender',
        meta: { title: '已撮合线路标书' },
        apiUrl: '/bss/v1/bss/tender/selectListByQuery/havePended'
      },
      {
        path: '/outLine-tender',
        component: () => import('@/views/tender/outLineTender'),
        name: 'OutLineTender',
        meta: { title: '已下线线路标书' },
        apiUrl: '/bss/v1/bss/tender/selectListByQuery/haveOffined'
      },
      {
        path: '/all-tender',
        component: () => import('@/views/tender/allTender'),
        name: 'AllTender',
        hidden: true,
        meta: { title: '所有标书', icon: 'tab', noCache: true, affix: true },
        apiUrl: '/bss/v1/bss/line/task/selectListByKey'
      },
      {
        path: '/all-tender-list',
        component: () => import('@/views/carline/allTenderList'),
        name: 'AllTenderList',
        meta: { title: '标书总列表' },
        apiUrl: '/bss/v1/bss/tender/selectListByKey/tenderListAll'
      },
      {
        path: '/create-tender',
        component: () => import('@/views/carline/createTender'),
        name: 'CreateTender',
        hidden: true,
        meta: { title: '新建标书' },
        apiUrl: '/line/line/task/createTenderByType'
      },
      {
        path: '/create-tender-p',
        component: () => import('@/views/carline/createTender'),
        name: 'CreateTenderP',
        hidden: true,
        meta: { title: '新建标书' },
        apiUrl: '/line/line/task/manuallyCreateTender'
      },
      {
        path: '/tender-log',
        component: () => import('@/views/tender/tenderLog'),
        name: 'TenderLog',
        hidden: true,
        meta: { title: '操作记录', icon: 'tab', noCache: true, affix: true },
        apiUrl: '/match/tender/log/list'
      },
      {
        path: '/line-log',
        component: () => import('@/views/carline/operationLog'),
        name: 'LineLog',
        hidden: true,
        meta: { title: '操作日志', icon: 'international', noCache: true, affix: true },
        apiUrl: '/line/line/task/log/list'
      },
      // {
      //   path: 'car-line3',
      //   component: () => import('@/views/carline/addCarLine'),
      //   name: 'AddCarLine',
      //   meta: { title: '可售线路' }
      // },
      // {
      //   path: 'car-line4',
      //   component: () => import('@/views/carline/addCarLine'),
      //   name: 'AddCarLine',
      //   meta: { title: '待撮合线路标书' }
      // },
      // {
      //   path: 'car-line5',
      //   component: () => import('@/views/carline/addCarLine'),
      //   name: 'AddCarLine',
      //   meta: { title: '已撮合线路标书' }
      // },
      // {
      //   path: 'car-line6',
      //   component: () => import('@/views/carline/addCarLine'),
      //   name: 'AddCarLine',
      //   meta: { title: '已下线线路标书' }
      // }
      // {
      //   path: '/car-line',
      //   component: () => import('@/views/nested/menu1/index'),
      //   name: 'CarLineList',
      //   meta: { title: '线路任务', icon: 'line', noCache: true, affix: true },
      //   redirect: 'all-line-list',
      //   apiUrl: '/bss/v1/bss/line/task/selectListByQuery/all',
      //   children: [
      //
      //   ]
      // },
      // {
      //   path: 'add-car-line',
      //   component: () => import('@/views/carline/addCarLine'),
      //   name: 'AddCarLine',
      //   hidden: true,
      //   meta: { title: '创建线路', icon: 'international', noCache: true, affix: true }
      // },
      {
        path: '/line-detail',
        component: () => import('@/views/carline/carLineDetail'),
        name: 'CarLIneDetail',
        hidden: true,
        meta: { title: '线路详情', icon: 'international', noCache: true, affix: true },
        apiUrl: '/line/line/task/detail'
      },
      {
        path: '/tender-audit',
        component: () => import('@/views/tender/tenderAudit'),
        name: 'TenderAudit',
        hidden: true,
        meta: { title: '线路审核', icon: 'tab', noCache: true, affix: true },
        apiUrl: '/line/line/task/detail'
      },
      {
        path: '/add-line-clue',
        component: () => import('@/views/carline/addLineClue'),
        name: 'AddLineClue',
        hidden: true,
        meta: { title: '创建线路线索', icon: 'tab', noCache: true, affix: true },
        apiUrl: '/line/line/task/detail'
      }
    ]
  },
  // {
  //   path: '/tender',
  //   component: Layout,
  //   name: '标书管理',
  //   redirect: '/tender-list',
  //   hidden: true,
  //   meta: {
  //     title: '标书管理',
  //     icon: 'tender'
  //   },
  //   apiUrl: '/bss/v1/bss/tender/selectListByKey',
  //   children: [
  //     {
  //       path: '/tender-list',
  //       component: () => import('@/views/tender/tenderList'),
  //       name: 'TenderList',
  //       // meta: { title: '标书列表', icon: 'tender', noCache: true, affix: true }
  //       meta: { title: '标书中心', icon: 'tender', noCache: true, affix: true },
  //       apiUrl: '/bss/v1/bss/tender/selectListByKey'
  //     },
  //     {
  //       path: '/tender-log',
  //       component: () => import('@/views/tender/tenderLog'),
  //       name: 'TenderLog',
  //       hidden: true,
  //       meta: { title: '操作记录', icon: 'tab', noCache: true, affix: true },
  //       apiUrl: '/line/line/task/log/list'
  //     }
  //   ]
  // },
  {
    path: '/order',
    component: Layout,
    name: '订单管理',
    redirect: '/pend-order',
    meta: {
      title: '订单管理',
      icon: 'order'
    },
    apiUrl: 'root',
    children: [
      // {
      //   path: '/creat-order',
      //   component: () => import('@/views/orderForm/creatOrder'),
      //   name: 'CreatOrder',
      //   meta: { title: '创建新订单', icon: '', noCache: false, affix: true },
      //   apiUrl: '/order/orderManager/createNewOrder'
      // },
      {
        path: '/creat-order',
        component: () => import('@/views/orderForm/creatOrderNew'),
        name: 'CreatOrderNew',
        meta: { title: '创建新订单', icon: '', noCache: false, affix: true },
        apiUrl: '/order/orderManager/createNewOrder'
      },
      {
        path: '/pend-order',
        component: () => import('@/views/orderForm/pendOrder'),
        name: 'PendOrder',
        meta: { title: '待成交订单', icon: '', noCache: false, affix: true },
        apiUrl: '/bss/v1/bss/order/selectListByQuery/notyet'
      },
      {
        path: '/check-order',
        component: () => import('@/views/orderForm/checkOrder'),
        name: 'CheckOrder',
        meta: { title: '待总部确认订单', icon: '', noCache: false, affix: true },
        apiUrl: '/bss/v1/bss/order/selectListByQuery/toConfirm'
      },
      {
        path: '/clinch-order',
        component: () => import('@/views/orderForm/clinchOrder'),
        name: 'ClinchOrder',
        meta: { title: '已成交订单', icon: '', noCache: false, affix: true },
        apiUrl: '/bss/v1/bss/order/selectListByQuery/haveDeal'
      },
      {
        path: '/delet-order',
        component: () => import('@/views/orderForm/deletOrder'),
        name: 'DeletOrder',
        meta: { title: '已删除订单', icon: '', noCache: false, affix: true },
        apiUrl: '/bss/v1/bss/order/selectListByQuery/delete'
      },
      {
        path: '/order-refund',
        component: () => import('@/views/orderForm/refundOrder'),
        name: 'refundOrder',
        meta: { title: '订单退款列表', noCache: false, affix: true },
        // apiUrl: '/bss/v1/bss/order/selectListByQuery/delete'
        apiUrl: '/bss/v1/order/refundApply/selectListByKey'
      },
      {
        path: '/refund-detail',
        component: () => import('@/views/orderForm/refundDetail'),
        name: 'RefundDetail',
        hidden: true,
        meta: { title: '司机退款详情', noCache: false, affix: true },
        // apiUrl: '/bss/v1/bss/order/selectListByQuery/delete'
        apiUrl: '/order/v1/order/refundApply/detail'
      },
      // {
      //   path: '/order-list',
      //   component: () => import('@/views/orderForm/orderList'),
      //   name: 'OrderList',
      //   meta: { title: '订单管理', icon: 'order', noCache: false, affix: true }
      // },
      {
        path: '/signing',
        // component: () => import('@/views/orderForm/signing'),
        component: () => import('@/views/orderForm/checkSign'),
        name: 'CheckSign',
        hidden: true,
        meta: { title: '签约', icon: 'dashboard', noCache: false, affix: true },
        apiUrl: '/order/orderManager/createNewOrder'
      },
      {
        path: '/order-detail',
        component: () => import('@/views/orderForm/orderDetail'),
        name: 'OrderDetail',
        hidden: true,
        meta: { title: '订单详情', icon: 'dashboard', noCache: false, affix: true },
        apiUrl: '/order/orderManager/orderDetail'
      },
      {
        path: '/delivery',
        component: () => import('@/views/orderForm/delivery'),
        name: 'Delivery',
        hidden: true,
        meta: { title: '交付信息', icon: 'dashboard', noCache: false, affix: true },
        apiUrl: '/order/order/carDelivery'
      }
    ]
  },
  {
    path: '/driver',
    component: Layout,
    name: '司机管理',
    redirect: '/driver-list-new',
    meta: {
      title: '司机管理',
      icon: 'driver'
    },
    apiUrl: 'root',
    children: [
      {
        path: '/driver-list',
        component: () => import('@/views/driverManagement/driverListNew'),
        name: 'DriverList',
        // meta: { title: '司机列表', icon: 'driver', noCache: false, affix: true }
        hidden: true,
        meta: { title: '司机列表', icon: 'driver', noCache: false, affix: true },
        apiUrl: '/bss/v1/bss/driver/selectListByKey'
      },
      {
        path: '/driver-list-new',
        component: () => import('@/views/driverManagement/driverListNew'),
        name: 'DriverListNew',
        meta: { title: '司机列表', icon: '', noCache: false, affix: true },
        apiUrl: '/bss/v1/bss/driver/selectListByKey'
      },
      {
        path: '/driver-freight-list',
        component: () => import('@/views/driverManagement/driverFreightList'),
        name: 'DriverFreightList',
        meta: { title: '司机运费', icon: '', noCache: false, affix: true },
        apiUrl: '/bss/bss/driver/dispatch/selectListByKey'
      },
      {
        path: '/behavior-monitoring',
        component: () => import('@/views/driverManagement/behaviorMonitoring'),
        name: 'BehaviorMonitoring',
        // meta: { title: '司机监控', icon: 'monitoring', noCache: false, affix: true }
        meta: { title: '司机监控', icon: '', noCache: false, affix: true },
        apiUrl: '/bss/v1/bss/driver/monitor/selectListByKey'
      },
      {
        path: '/driver-feedback-list',
        component: () => import('@/views/driverManagement/feedbackList'),
        name: 'FeedbackList',
        meta: { title: '司机反馈', icon: '', noCache: false, affix: true },
        apiUrl: '/bss/v1/bss/driver/feedback-issue/selectListByQuery/all'
      },
      {
        path: '/driver-feedback-detail',
        component: () => import('@/views/driverManagement/feedbackDetail'),
        name: 'FeedbackDetail',
        hidden: true,
        meta: { title: '司机反馈详情', icon: 'finance', noCache: false, affix: true },
        apiUrl: '/driver/driver/income/calendar'
      },
      {
        path: '/finance-monitoring',
        component: () => import('@/views/driverManagement/financeMonitoring'),
        name: 'FinanceMonitoring',
        hidden: true,
        meta: { title: '财务监控', icon: 'finance', noCache: false, affix: true },
        apiUrl: '/driver/driver/income/calendar'
      },
      {
        path: '/add-driver',
        component: () => import('@/views/driverManagement/addDriver'),
        name: 'AddDriver',
        hidden: true,
        meta: { title: '创建司机', icon: 'driver', noCache: false, affix: true },
        apiUrl: '/bss/v1/bss/driver/selectListByKey'
      },
      {
        path: '/driver-detail',
        component: () => import('@/views/driverManagement/driverDetail'),
        name: 'DriverDetail',
        hidden: true,
        meta: { title: '司机详情', icon: 'driver', noCache: false, affix: true },
        apiUrl: '/driver/driver/detail'
      },
      {
        path: '/income-calendar',
        component: () => import('@/views/driverManagement/incomeCalendar'),
        name: 'IncomeCalendar',
        hidden: true,
        meta: { title: '司机收入日历', icon: 'driver', noCache: false, affix: true },
        apiUrl: '/driver/driver/income/calendar'
      },
      {
        path: '/driverLine-in',
        component: () => import('@/views/driverManagement/driverLineIn'),
        name: 'DriverLineIn',
        hidden: true,
        meta: { title: '司机内线收入', icon: 'driver', noCache: false, affix: true },
        apiUrl: '/driver/driver/income/calendar'
      },
      {
        path: '/driverLine-out',
        component: () => import('@/views/driverManagement/driverLineOut'),
        name: 'DriverLineOut',
        hidden: true,
        meta: { title: '司机外线收入', icon: 'driver', noCache: false, affix: true },
        apiUrl: '/driver/driver/income/calendar'
      },
      {
        path: '/comein-detail',
        component: () => import('@/views/driverManagement/comeinDetail'),
        name: 'ComeinDetail',
        hidden: true,
        meta: { title: '收入提报详情', icon: 'driver', noCache: false, affix: true },
        apiUrl: '/driver/driver/income/calendar'
      },
      {
        path: '/dispatch-record',
        component: () => import('@/views/driverManagement/dispatchRecord'),
        name: 'DispatchRecord',
        hidden: true,
        meta: { title: '司机出车记录', icon: 'driver', noCache: false, affix: true },
        apiUrl: '/driver/driver/income/calendar'
      },
      {
        path: '/checkOn-work',
        component: () => import('@/views/driverManagement/checkOnWork'),
        name: 'CheckOnWork',
        hidden: true,
        meta: { title: '考勤管理', icon: 'driver', noCache: false, affix: true },
        apiUrl: '/driver/driver/income/calendar'
      }
    ]
  },
  {
    path: '/clue',
    component: Layout,
    name: '线索管理',
    redirect: '/clue-list',
    apiUrl: 'root',
    meta: {
      title: '线索管理',
      icon: 'clue'
    },
    children: [
      // {
      //   path: '/clue-list',
      //   component: () => import('@/views/clue/clueList'),
      //   name: 'ClueList',
      //   meta: { title: '线索管理', icon: 'clue', noCache: false, affix: true, roles: ['editor'] },
      //   apiUrl: '/bss/v1/bss/driver/clue/selectListByKey'
      // },
      {
        path: '/clue-list',
        component: () => import('@/views/clue/clueListNew'),
        name: 'ClueListNew',
        meta: { title: '线索管理', icon: 'clue', noCache: false, affix: true, roles: ['admin'] },
        apiUrl: '/bss/v1/bss/driver/clue/selectListByKey'
      },
      {
        path: '/add-clue',
        component: () => import('@/views/clue/addClue'),
        name: 'AddClue',
        hidden: true,
        meta: { title: '跟进', icon: 'clue', noCache: false, affix: false, roles: ['admin'] },
        apiUrl: '/driver/driver/clue/getBasicDetail'
      },
      {
        path: '/add-clue-new',
        component: () => import('@/views/clue/addClueNew'),
        name: 'AddClueNew',
        hidden: true,
        meta: { title: '添加线索', icon: 'clue', noCache: false, affix: false, roles: ['admin'] },
        apiUrl: '/driver/driver/clue/bss/create'
      },
      {
        path: '/distribution-clue',
        component: () => import('@/views/clue/distribution'),
        name: 'Distribution',
        hidden: true,
        meta: { title: '线索分配', icon: 'clue', noCache: false, affix: false, roles: ['admin'] },
        apiUrl: '/driver/driver/clue/bss/clueDistribute'
      },
      {
        path: '/clue-log',
        component: () => import('@/views/clue/clue-log'),
        name: 'ClueLog',
        hidden: true,
        meta: { title: '操作日志', icon: 'clue', noCache: false, affix: false, roles: ['admin'] },
        apiUrl: '/driver/driver/clue/log/list'
      },
      {
        path: '/clue-detail',
        component: () => import('@/views/clue/clueDetail'),
        name: 'ClueDetail',
        hidden: true,
        meta: { title: '线索详情', icon: 'clue', noCache: false, affix: false, roles: ['admin'] },
        apiUrl: '/driver/driver/clue/bss/clueInfo'
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    name: '数据统计',
    redirect: '/bargain-statistics',
    apiUrl: 'root',
    meta: {
      title: '数据统计',
      icon: 'clue'
    },
    children: [
      // {
      //   path: '/data-statistics',
      //   component: () => import('@/views/dataStatistics/dataStatistics'),
      //   name: 'DataStatistics',
      //   meta: { title: '数据统计', icon: 'data', noCache: false, affix: true, roles: ['admin'] },
      //   apiUrl: '/bss/v1/bss/driver/clue/selectListByKey'
      // },
      {
        path: '/bargain-statistics',
        component: () => import('@/views/dataStatistics/bargainStatistics'),
        name: 'DataStatistics',
        meta: { title: '数据统计', icon: 'data', noCache: false, affix: true, roles: ['admin'] },
        apiUrl: '/order/business/operation/queryVehicleTransactionStatistics'
      }
    ]
  },
  {
    path: '/statistical',
    component: Layout,
    name: '赋能统计',
    redirect: '/yingyan-statistics',
    apiUrl: 'root',
    meta: {
      title: '赋能统计',
      icon: 'clue'
    },
    children: [
      {
        path: '/yingyan-statistics',
        component: () => import('@/views/scoreData/index'),
        name: 'ScoreData',
        meta: { title: '赋能统计', icon: 'data', noCache: false, affix: true, roles: ['admin'] },
        apiUrl: '/datacenter/help/city/item/item/list'
      }
    ]
  },
  {
    path: '/group',
    component: Layout,
    name: 'GMV统计',
    redirect: '/group-in',
    apiUrl: 'root',
    meta: {
      title: 'GMV统计',
      icon: 'export'
    },
    children: [
      {
        path: '/leader-in',
        component: () => import('@/views/gmv/leaderIn'),
        name: 'leaderIn',
        meta: { title: '审核GMV导入', icon: '', noCache: true, affix: true },
        apiUrl: '/line/line/gmv/importFileExamine'
      },
      {
        path: '/group-in',
        component: () => import('@/views/gmv/groupIn'),
        name: 'GroupIn',
        meta: { title: '小组GMV导入', icon: '', noCache: true, affix: true },
        apiUrl: '/line/line/gmv/importFile'
      },
      {
        path: '/city-export',
        component: () => import('@/views/gmv/cityExport'),
        name: 'CityExport',
        meta: { title: '城市导出', icon: '', noCache: true, affix: true },
        apiUrl: '/line/line/gmv/getDownloadExcelFromCity'
      },
      {
        path: '/professional-export',
        component: () => import('@/views/gmv/professionalExport'),
        name: 'ProfessionalExport',
        meta: { title: '专车纵线导出', icon: '', noCache: true, affix: true },
        apiUrl: '/line/line/gmv/getDownloadExcelFromSpecial'
      },
      {
        path: '/share-export',
        component: () => import('@/views/gmv/shareExport'),
        name: 'ShareExport',
        meta: { title: '共享纵线导出', icon: '', noCache: true, affix: true },
        apiUrl: '/line/line/gmv/getDownloadExcelFromShare'
      },
      {
        path: '/outside-export',
        component: () => import('@/views/gmv/outsideExport'),
        name: 'OutsideExport',
        meta: { title: '外线纵线导出', icon: '', noCache: true, affix: true },
        apiUrl: '/line/line/gmv/getDownloadExcelFromExternal'
      },
      {
        path: '/self-export',
        component: () => import('@/views/gmv/selfExport'),
        name: 'SelfExport',
        meta: { title: '自承运纵线导出', icon: '', noCache: true, affix: true },
        apiUrl: '/line/line/gmv/getDownloadExcelFromSelfCarrying'
      },
      {
        path: '/partner-export',
        component: () => import('@/views/gmv/partnerExport'),
        name: 'PartnerExport',
        meta: { title: '合伙承运纵线导出', icon: '', noCache: true, affix: true },
        apiUrl: '/line/line/gmv/getDownloadExcelFromPartnerShip'
      }
    ]
  },
  {
    path: '/match',
    component: Layout,
    name: '撮合大会',
    redirect: '/join-in',
    apiUrl: 'root',
    meta: {
      title: '撮合大会',
      icon: 'tree'
    },
    children: [
      {
        path: '/join-in',
        component: () => import('@/views/matchUp/joinIn'),
        name: 'JoinIn',
        meta: { title: '加盟主导', icon: '', noCache: true, affix: true },
        apiUrl: '/bss/v1/bss/match/selectDriverIntentionListByQuery'
      },
      {
        path: '/outside-lines',
        component: () => import('@/views/matchUp/outsideLines'),
        name: 'OutsideLines',
        meta: { title: '外线主导', icon: '', noCache: true, affix: true },
        apiUrl: '/bss/v1/bss/match/outline/selectLineListByQuery'
      },
      {
        path: '/follow-up',
        component: () => import('@/views/matchUp/followUp'),
        name: 'FollowUp',
        meta: { title: '撮合跟进', icon: '', noCache: true, affix: true },
        apiUrl: '/bss/v1/bss/match/follow/selectListByQuery'
      },
      {
        path: '/match-statistics',
        component: () => import('@/views/matchUp/matchStatistics'),
        name: 'MatchStatistics',
        meta: { title: '撮合统计', icon: '', noCache: true, affix: true },
        apiUrl: '/line/line/gmv/getDownloadExcelFromPartnerShip'
      }
    ]
  },
  { path: '*', redirect: '/401', hidden: true, apiUrl: '/bss/v1/bss/line/task/ownLineTasks' }
]

export default userRouter
