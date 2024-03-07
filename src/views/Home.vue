<script setup>
//组件导入
import { ref, onMounted, getCurrentInstance } from 'vue'
import { loginPage, test } from "@/api/index.js";
import { showToast } from 'vant';
import useUserStore from '@/store/modules/user';
//数据定义
const checked = ref(true);
const showc = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');
const store = useUserStore();


const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [{ text: '杭州市', value: '330100' }],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [{ text: '南京市', value: '320100' }],
  },
];
const date = ref('');
const show = ref(false);
const userInfo = {
  token: "kkajxuahbn"
};
//方法使用
const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (value) => {
  debugger
  show.value = false;
  date.value = formatDate(value);
};
const onFinish = ({ selectedOptions }) => {
  showc.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join('/');
};

const login = () => {
  store.increment()
  showToast({
    message: '自定义图标',
    icon: 'like-o',
  });
  loginPage(userInfo).then(res => {
    console.log(1)
  }).catch(err => {
    console.log(err);
  })
  // test(userInfo).then(res=>{
  //   console.log(1)
  // }).catch(err=>{
  //   console.log(err);
  // })
  // appContext.config.globalProperties.$toast({
  //   message: 'This message will contain a incomprehensibilities long word.',
  //   wordBreak: 'break-all',
  //   duration: 3000
  // })
}
</script>

<template>
  <div class="home">
    组件使用
    <van-button type="primary" class="btn" @click="login">{{ $t("menus.header.home") }}</van-button>
      <van-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区" @click="showc = true" />
      <van-popup v-model:show="showc" round position="bottom">
        <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="showc = false"
          @finish="onFinish" />
      </van-popup>
      <p>count值：{{store.count}}</p>
      <van-checkbox v-model="checked">复选框</van-checkbox>
      <van-cell title="选择单个日期" :value="date" @click="show = true" />
      <van-calendar v-model:show="show" @confirm="onConfirm" />
  </div>
</template>

<style scoped lang="less">

</style>
