// import Mock from 'mockjs'

const res = {
  'data': [
    {
      'id': 1001,
      'code': '330000',
      'name': '浙江省'
    },
    {
      'id': 1114,
      'code': '340000',
      'name': '安徽省'
    },
    {
      'id': 1252,
      'code': '350000',
      'name': '福建省'
    },
    {
      'id': 1356,
      'code': '360000',
      'name': '江西省'
    },
    {
      'id': 1479,
      'code': '370000',
      'name': '山东省'
    },
    {
      'id': 1651,
      'code': '410000',
      'name': '河南省'
    },
    {
      'id': 1845,
      'code': '420000',
      'name': '湖北省'
    },
    {
      'id': 19,
      'code': '120000',
      'name': '天津市'
    },
    {
      'id': 1975,
      'code': '430000',
      'name': '湖南省'
    },
    {
      'id': 2,
      'code': '110000',
      'name': '北京市'
    },
    {
      'id': 2125,
      'code': '440000',
      'name': '广东省'
    },
    {
      'id': 2285,
      'code': '450000',
      'name': '广西壮族自治区'
    },
    {
      'id': 230,
      'code': '140000',
      'name': '山西省'
    },
    {
      'id': 2425,
      'code': '460000',
      'name': '海南省'
    },
    {
      'id': 2459,
      'code': '500000',
      'name': '重庆市'
    },
    {
      'id': 2498,
      'code': '510000',
      'name': '四川省'
    },
    {
      'id': 2721,
      'code': '520000',
      'name': '贵州省'
    },
    {
      'id': 2824,
      'code': '530000',
      'name': '云南省'
    },
    {
      'id': 2978,
      'code': '540000',
      'name': '西藏自治区'
    },
    {
      'id': 3063,
      'code': '610000',
      'name': '陕西省'
    },
    {
      'id': 3191,
      'code': '620000',
      'name': '甘肃省'
    },
    {
      'id': 3304,
      'code': '630000',
      'name': '青海省'
    },
    {
      'id': 3358,
      'code': '640000',
      'name': '宁夏回族自治区'
    },
    {
      'id': 3391,
      'code': '650000',
      'name': '新疆维吾尔自治区'
    },
    {
      'id': 3512,
      'code': '710000',
      'name': '台湾省'
    },
    {
      'id': 36,
      'code': '130000',
      'name': '河北省'
    },
    {
      'id': 372,
      'code': '150000',
      'name': '内蒙古自治区'
    },
    {
      'id': 3891,
      'code': '810000',
      'name': '香港特别行政区'
    },
    {
      'id': 3913,
      'code': '820000',
      'name': '澳门特别行政区'
    },
    {
      'id': 496,
      'code': '210000',
      'name': '辽宁省'
    },
    {
      'id': 625,
      'code': '220000',
      'name': '吉林省'
    },
    {
      'id': 703,
      'code': '230000',
      'name': '黑龙江省'
    },
    {
      'id': 857,
      'code': '310000',
      'name': '上海市'
    },
    {
      'id': 875,
      'code': '320000',
      'name': '江苏省'
    }
  ],
  'success': true,
  'paging': false
}

export default {
  getList: () => {
    return {
      res: res
    }
  }
}