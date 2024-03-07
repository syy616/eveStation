//使用pinia来管理全局状态
import { defineStore } from "pinia"

/*defineStore 是需要传参数的，其中第一个参数是id，就是一个唯一的值，
简单点说就可以理解成是一个命名空间.
第二个参数就是一个对象，里面有三个模块需要处理，第一个是 state，
第二个是 getters，
第三个是 actions。
*/
//声明了一个useUserStore方法
const useUserStore = defineStore('user', {
  //准备state——用于存储数据
  state: () => {
    return {
      count: 0
    }
  },
  getters: {

  },
  //准备actions——用于响应组件中的动作和用于操作数据（state）,pinia中只有state、getter、action，抛弃了Vuex中的Mutation
  actions: {
    increment() {
      console.log("我来到actions方法里面了")
      this.count++
      return this.count
    }
  }
})

export default useUserStore
