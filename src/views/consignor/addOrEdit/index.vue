<template>
  <div class="consignorAddOrEdit">
    <NavBar v-if="false" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.customerName"
        required
        name="货主简称"
        :maxlength="25"
        label="货主简称"
        placeholder="请输入"
        :rules="[{ required: true, message: '请填写货主简称' }]"
      >
      </van-field>
      <van-field
        v-model="form.customerNameAll"
        required
        name="货主主体"
        :maxlength="25"
        label="货主主体"
        placeholder="请输入"
        :rules="[{ required: true, message: '请填写货主主体' }]"
      >
      </van-field>
      <van-field
        readonly
        required
        clickable
        name="picker"
        :value="form.city"
        label="城市"
        is-link
        placeholder="请选择"
        :rules="[{ required: true, message: '请选择城市' }]"
        @click="showCityPicker = true"
      >
      </van-field>
      <van-popup v-model="showCityPicker" position="bottom">
        <van-picker
          title="城市"
          show-toolbar
          :columns="cityNames"
          @confirm="onCityConfirm"
          @cancel="showCityPicker = false"
        />
      </van-popup>
      <van-field
        :value="form.contractEnd"
        readonly
        clickable
        name="picker"
        label="合同止期"
        is-link
        placeholder="请选择"
        @click="showHtPicker = true"
      />
      <van-popup v-model="showHtPicker" position="bottom">
        <van-datetime-picker
          title="合同止期"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onHtConfirm"
          @cancel="showHtPicker = false"
        />
      </van-popup>
      <van-field
        v-model="form.address"
        required
        name="详细地址"
        :maxlength="50"
        label="详细地址"
        placeholder="请输入"
        :rules="[{ required: true, message: '请填写详细地址' }]"
      >
      </van-field>
      <van-field name="radio" label="结算周期是否包含当月" label-width="180px">
        <template #input>
          <van-radio-group v-model="form.currentMonth" direction="horizontal">
            <van-radio name="1">
              是
            </van-radio>
            <van-radio name="2">
              否
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="form.billingCycle"
        name="结算周期"
        required
        label="结算周期"
        :maxlength="3"
        placeholder="请输入"
        type="number"
        :rules="[{ required: true, message: '请填写结算周期' }]"
      >
      </van-field>
      <van-field
        v-model="form.bussinessName"
        required
        label-width="110px"
        name="业务对接人姓名"
        :maxlength="20"
        label="业务对接人姓名"
        placeholder="请输入"
        :rules="[{ required: true, message: '请填写业务对接人姓名' }]"
      >
      </van-field>
      <van-field
        v-model="form.bussinessPhone"
        label-width="110px"
        required
        name="validator"
        type="tel"
        label="业务对接人电话"
        placeholder="请输入"
        :rules="[{ pattern:phoneRegExp, message: form.bussinessPhone ? '请填写业务对接人手机号':'请填写正确的手机号' }]"
      >
      </van-field>
      <van-field
        v-model="form.bussinessCard"
        name="身份证号"
        label="身份证号"
        placeholder="请输入"
      />
      <van-field
        v-model="form.remark"
        name="备注"
        rows="2"
        maxlength="50"
        show-word-limit
        label="备注"
        placeholder="请输入"
      />
      <van-field name="uploader" label="营业执照">
        <template #input>
          <van-uploader
            v-model="fileList"
            multiple
            :max-count="2"
            accept="image/*"
            :after-read="afterRead"
          />
        </template>
      </van-field>
      <van-field
        readonly
        required
        clickable
        name="picker"
        :value="form.primaryClassification"
        label="一级分类"
        is-link
        placeholder="请选择"
        :rules="[{ required: true, message: '请填选择一级分类' }]"
        @click="showlev1Picker = true"
      >
      </van-field>
      <van-popup v-model="showlev1Picker" position="bottom">
        <van-picker
          title="一级分类"
          show-toolbar
          :columns="getLineCustomerOne.map(item => item.name)"
          @confirm="onLev1Confirm"
          @cancel="showlev1Picker = false"
        >
        </van-picker>
      </van-popup>
      <template v-if="getLineCustomerTwo && getLineCustomerTwo.length > 0">
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="form.secondaryClassification"
          label="二级分类"
          is-link
          placeholder="请选择"
          :rules="[{ required: true, message: '请填选择二级分类' }]"
          @click="showlev2Picker = true"
        />
        <van-popup v-model="showlev2Picker" position="bottom">
          <van-picker
            title="二级分类"
            show-toolbar
            :columns="getLineCustomerTwo.map(item => item.name)"
            @confirm="onLev2Confirm"
            @cancel="showlev2Picker = false"
          />
        </van-popup>
      </template>
      <template
        v-else-if="form.primaryClassification === '自承运'"
      >
        <van-field
          v-model="form.customerIdOpposite"
          name="第三方编号"
          required
          :maxlength="28"
          label="第三方编号"
          :rules="[{ required: true, message: '请输入第三方编号' }]"
          placeholder="请输入"
        />
      </template>
      <div
        style="
        margin:
        16px;text-align:center;"
      >
        <van-button type="info" round native-type="submit" class="btn" color="linear-gradient(270deg, #5C9BDD 0%, #80D8F3 100%)">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from './components/navBar'
import { Form, Field, Button, Popup, Picker, DatetimePicker, RadioGroup, Radio, Uploader, Toast, Dialog } from 'vant';
import dayjs from 'dayjs'
import { getCity, uploadFile, getLineCustomerOneOrTwoCategory, creatCustomer, editCustomer, editClientDetail } from '@/api/consignor'
export default {
  components: {
    NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [DatetimePicker.name]: DatetimePicker,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      id: '',
      form: {
        customerName: '',
        customerNameAll: '',
        city: '',
        contractEnd: '',
        address: '',
        currentMonth: '1',
        billingCycle: '',
        bussinessName: '',
        bussinessPhone: '',
        bussinessCard: '',
        remark: '',
        businessLicense: [],
        primaryClassification: '',
        secondaryClassification: '',
        customerIdOpposite: ''
      },
      getLineCustomerOne: [],
      getLineCustomerTwo: [],
      fileList: [],
      phoneRegExp: /^[1][3-9][0-9]{9}$/,
      idCardRegExp: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      showCityPicker: false,
      cityColumns: {},
      cityNames: [],
      showHtPicker: false,
      minDate: this.getTomorrowDay(),
      maxDate: new Date(2300, 12, 31),
      showlev1Picker: false,
      showlev2Picker: false,
      isSave: false
    }
  },
  async activated() {
    this.getCityLists()
    await this.getOneLeave()
    this.id = this.$route.query.id
    if (this.id) {
      this.getDetail()
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.id && !this.isComplete()) {
      return this.onClickLeft()
    } else {
      this.reset()
      next()
    }
  },
  methods: {
    /**
     * 验证是否填写完整
     */
    isComplete() {
      if (!this.form.customerName) {
        return false
      } else if (!this.form.customerNameAll) {
        return false
      } else if (!this.form.city) {
        return false
      } else if (!this.form.address) {
        return false
      } else if (!this.form.billingCycle) {
        return false
      } else if (!this.form.bussinessName) {
        return false
      } else if (!this.form.bussinessPhone) {
        return false
      } else if (!this.form.primaryClassification) {
        return false
      }
      return true
    },
    onClickLeft() {
      Dialog.confirm({
        title: '提示',
        message: '请确认不在填写信息,返回上一个页面!',
        confirmButtonColor: '#5C9BDD'
      }).then(() => {
        this.id = '123' // 用户点击确认，为了离开当前页面，随便赋值
        this.$router.push({
          path: '/bss/consignorList'
        })
      })
    },
    getTomorrowDay() {
      let str = dayjs().add(1, 'day')
      let year = str.year()
      let month = str.month()
      let day = str.date()
      return new Date(year, month, day)
    },
    /**
     * 获取城市列表
     */
    async getCityLists() {
      try {
        let { data: res } = await getCity()
        if (res.success) {
          this.cityColumns = res.data
          this.cityNames = Object.keys(this.cityColumns)
        } else {
          Toast.fail(res.errorMsg || res.msg)
        }
      } catch (err) {
        Toast.fail(err)
      }
    },
    /**
     *1级分类
     */
    async getOneLeave() {
      try {
        let { data: res } = await getLineCustomerOneOrTwoCategory({})
        if (res.success) {
          this.getLineCustomerOne = res.data
          if (this.form.primaryClassification) {
            this.changeOne(this.form.primaryClassification)
          }
        } else {
          Toast.fail(res.errorMsg || res.msg)
        }
      } catch (err) {
        Toast.fail(err)
      }
    },
    changeOne(val) {
      this.getLineCustomerOne.forEach((i) => {
        if (i.name === val) {
          this.getLineCustomerTwo = i.nextCategorys
        }
      })
    },
    async onSubmit(values) {
      if (this.form.bussinessCard && !this.idCardRegExp.test(this.form.bussinessCard)) {
        return Toast.fail('请输入正确的身份证号')
      }
      if (!this.isSave) {
        this.isSave = true
        this.form.businessLicense = this.form.businessLicense.filter(item => item).join(',')
        this.form.contractEnd = dayjs(this.form.contractEnd).valueOf()
        let code1 = ''
        let code2 = ''
        if (this.form.primaryClassification) {
          code1 = this.getLineCustomerOne.filter(item => item.name === this.form.primaryClassification)[0].code
        }

        if (this.form.secondaryClassification) {
          code2 = this.getLineCustomerTwo.filter(item => item.name === this.form.secondaryClassification)[0].code
        }
        this.form.city = this.cityColumns[this.form.city]

        this.form.primaryClassification = code1
        this.form.secondaryClassification = code2
      }

      if (this.id) {
        // 更新
        this.update(this.form)
      } else {
        // 新增
        this.insert(this.form)
      }
    },
    /**
     * 新增
     */
    async insert(data) {
      const toast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      try {
        let { data: res } = await creatCustomer(data)
        toast.clear()
        if (res.success) {
          Toast.success('创建成功');
          setTimeout(() => {
            this.$router.push({
              path: '/bss/consignorList'
            })
          }, 1000)
        } else {
          Toast.fail(res.errorMsg || res.msg)
        }
      } catch (err) {
        toast.clear()
        Toast.fail(err)
      }
    },
    /**
     * 编辑
     */
    async update(data) {
      const toast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      try {
        let params = { ...data, customerId: this.id }
        let { data: res } = await editCustomer(params)
        toast.clear()
        if (res.success) {
          Toast.success('修改成功');
          setTimeout(() => {
            this.$router.push({
              path: '/bss/consignorList'
            })
          }, 1000)
        } else {
          Toast.fail(res.errorMsg || res.msg)
        }
      } catch (err) {
        toast.clear()
        Toast.fail(err)
      }
    },
    onCityConfirm(value) {
      this.form.city = value;
      this.showCityPicker = false;
    },
    /**
     * 合同止期
     */
    onHtConfirm(value) {
      this.form.contractEnd = dayjs(value).format('YYYY-MM-DD');
      this.showHtPicker = false;
    },
    /**
     * 一级分类
     */
    onLev1Confirm(value) {
      this.form.primaryClassification = value;
      this.showlev1Picker = false;
      this.form.secondaryClassification = ''
      this.form.customerIdOpposite = ''
      if (value !== '自承运') {
        this.changeOne(value)
      } else {
        this.getLineCustomerTwo = []
      }
    },
    /**
     * 二级分类
     */
    onLev2Confirm(value) {
      this.form.secondaryClassification = value;
      this.showlev2Picker = false;
    },
    /**
     * 上传图片
     */
    async afterRead(file) {
      if (file.file.size > 1024 * 1024 * 5) {
        if (this.fileList.length > 1) {
          this.fileList.pop()
        } else if (this.fileList.length > 0) {
          this.fileList = []
        }
        return Toast.fail('上传的文件不能超过5M')
      }
      let formdata = new FormData();
      formdata.append('file', file.file);
      let { data: res } = await uploadFile(formdata)
      if (res.success) {
        this.form.businessLicense.push(res.data.url)
      }
    },
    /**
     * 获取货主详情
     */
    async getDetail() {
      const toast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      try {
        let params = {
          customerId: this.id
        }
        let { data: res } = await editClientDetail(params)
        toast.clear()
        if (res.success) {
          this.form = res.data
          this.formatData()
        } else {
          Toast.fail(res.errorMsg || res.msg)
        }
      } catch (err) {
        toast.clear()
        Toast.fail(err)
      }
    },
    /**
     * 格式化数据
     */
    formatData() {
      // 合同止期
      this.form.contractEnd = dayjs(this.form.contractEnd).format('YYYY-MM-DD')
      // 结算周期是否包含当月
      this.form.currentMonth = this.form.currentMonth + ''
      // 城市转换数据
      for (let key in this.cityColumns) {
        if (+this.cityColumns[key] === this.form.city) {
          this.form.city = key
        }
      }
      // 图片显示
      this.fileList = this.form.businessLicense.filter(item => item).map(item => ({ url: item, isImage: true }))
      // 1级分类

      if (this.form.primaryClassification) {
        this.form.primaryClassification = this.getLineCustomerOne.filter(item => item.code === this.form.primaryClassification)[0].name
      }
      // 2级分类
      if (this.form.secondaryClassification) {
        this.changeOne(this.form.primaryClassification)
        if (this.getLineCustomerTwo.length > 0) {
          this.form.secondaryClassification = this.getLineCustomerTwo.filter(item => item.code === this.form.secondaryClassification)[0].name
        }
      }
    },
    /**
      重置表单
     */
    reset() {
      this.id = ''
      this.isSave = false
      this.cityNames = []
      this.cityColumns = {}
      this.fileList = []
      this.getLineCustomerOne = []
      this.getLineCustomerTwo = []
      this.form = {
        customerName: '',
        customerNameAll: '',
        city: '',
        contractEnd: '',
        address: '',
        currentMonth: '1',
        billingCycle: '',
        bussinessName: '',
        bussinessPhone: '',
        bussinessCard: '',
        remark: '',
        businessLicense: [],
        primaryClassification: '',
        secondaryClassification: '',
        customerIdOpposite: ''
      }
    }

  }
}

</script>

<style lang='scss' scoped>
.consignorAddOrEdit {
  .btn {
    display: inline-block;
    margin:50px auto;
    width: 300px;
  }
}

</style>

<style scoped>

  .consignorAddOrEdit >>> .van-picker__confirm {
    color: #5C9BDD;
  }
  .consignorAddOrEdit >>> .van-picker__cancel {
    color:#9B9B9B;
  }
</style>
