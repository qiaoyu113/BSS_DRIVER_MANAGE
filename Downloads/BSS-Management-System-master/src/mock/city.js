// import Mock from 'mockjs'

const res = {
  'data': [
    {
      'id': 107,
      'code': '130500',
      'name': '邢台市'
    },
    {
      'id': 128,
      'code': '130600',
      'name': '保定市'
    },
    {
      'id': 155,
      'code': '130700',
      'name': '张家口市'
    },
    {
      'id': 174,
      'code': '130800',
      'name': '承德市'
    },
    {
      'id': 187,
      'code': '130900',
      'name': '沧州市'
    },
    {
      'id': 205,
      'code': '131000',
      'name': '廊坊市'
    },
    {
      'id': 217,
      'code': '131100',
      'name': '衡水市'
    },
    {
      'id': 37,
      'code': '130100',
      'name': '石家庄市'
    },
    {
      'id': 61,
      'code': '130200',
      'name': '唐山市'
    },
    {
      'id': 77,
      'code': '130300',
      'name': '秦皇岛市'
    },
    {
      'id': 86,
      'code': '130400',
      'name': '邯郸市'
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
