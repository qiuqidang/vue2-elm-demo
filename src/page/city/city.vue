<template>
  <div>
    <head-top :head-title='cityName' :go-back='true'>
        <router-link to='/home' slot='changecity'>切换城市</router-link>
    </head-top>
    <div style="margin-top: 50px;">
        <input type="text" v-model="searchText" placeholder="输入学校、商务楼、地址">
        <input type="button" value='提交' @click="searchPlace">
    </div>
    <div>
        <ul>
            <li v-for="(item, key) in placeList" :key="key">
                <span>{{item.name}}</span><br>
                <span>{{item.address}}</span>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import headTop from '../../components/header/head'
import {
  currentcity,
  searchplace
} from '../../service/getData'

export default {
  data () {
    return {
      cityId: '', // 当前城市ID
      cityName: 'test', // 当前城市名称
      searchText: '', // 搜索内容
      placeList: [] // 地址列表
    }
  },

  created () {

  },

  mounted () {
    // 获取当前城市
    this.getCurrentCity()
  },

  props: [],

  components: {
      headTop
  },

  computed: {

  },

  methods: {
    // 当前城市
    async getCurrentCity () {
      this.cityId = this.$route.params.cityId
      let res = await currentcity(this.cityId)
      this.cityName = res.name
    },

    // 提交查询
    async searchPlace () {
        let res = await searchplace(this.cityId, this.searchText)
        this.placeList = res
    }
  },
}
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        padding-top: 2.35rem;
    }
    .change_city{
        right: 0.4rem;
        @include sc(0.6rem, #fff);
        @include ct;
    }
    .city_form{
        background-color: #fff;
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-top: 0.4rem;
        div{
            width: 90%;
            margin: 0 auto;
            text-align: center;
            .input_style{
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                @include wh(100%, 1.4rem);
            }
            .city_input{
                border: 1px solid $bc;
                padding: 0 0.3rem;
                @include sc(0.65rem, #333);
            }
            .city_submit{
                background-color: $blue;
                @include sc(0.65rem, #fff);
            }
        }
    }
    .pois_search_history{
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-left: 0.5rem;
        @include font(0.475rem, 0.8rem);
    }
    .getpois_ul{
        background-color: #fff;
        border-top: 1px solid $bc;
        li{
            margin: 0 auto;
            padding-top: 0.65rem;
            border-bottom: 1px solid $bc;
            .pois_name{
                margin: 0 auto 0.35rem;
                width: 90%;
               @include sc(0.65rem, #333);
            }
            .pois_address{
                width: 90%;
                margin: 0 auto 0.55rem;
                @include sc(0.45rem, #999);
            }
        }
    }
    .search_none_place{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-indent: 0.5rem;
    }
    .clear_all_history{
        @include sc(0.7rem, #666);
        text-align: center;
        line-height: 2rem;
        background-color: #fff;
    }
</style>
