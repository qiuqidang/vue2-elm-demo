<template>
  <div>
    <head-top signin-up='msite'>
      <router-link :to="'/search/' + geohash" slot="search" class="link_search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </router-link>
      <span slot="msite-title" class="msite_title" style="font-size: 18px;">{{addressName}}</span>
    </head-top>
    <div class="food_types_container">
      <ul>
        <router-link v-for="item in foodTypes" :key="item.id" :to="{path: '/food'}" tag="li" class="link_to_food">
          <figure>
            <img :src="'https://fuss10.elemecdn.com' + item.image_url" alt="" width="50" height="50">
            <figcaption>{{item.title}}</figcaption>
          </figure>
        </router-link>
      </ul>
    </div>
    <div class="shop_list_container">
      <ul>
        <router-link v-for="item in shopList" :key="item.id" :to="{path: '/shop'}" tag="li" class="shop_header">
          <img :src="'https://fuss10.elemecdn.com' + item.image_path" alt="">
          <span>{{item.name}}</span>
          <span>{{item.piecewise_agent_fee.tips}}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import headTop from 'src/components/header/head'

import {
  mapState,
  mapMutations
} from 'vuex'

import {
  SAVE_GEOHASH,
  RECORD_ADDRESS
} from 'src/store/mutation-types'

import {
  msiteAddress,
  msiteFoodTypes,
  shopList
} from 'src/service/getData'

export default {
  data () {
    return {
      addressName: '', // 地址
      foodTypes: [], // 食品分类列表
      shopList: [], // 商铺列表
    }
  },

  mounted () {
    // 获取并保存geohash
    let geohash = this.$route.query.geohash
    this.saveGeohash(geohash)

    // 获取msite页面地址信息
    msiteAddress(this.geohash)
      .then(res => {
        let name = res.name
        this.addressName = name.length > 9 ? name.slice(0, 9) + '...' : name
        this.recordAddress({
          latitude: res.latitude,
          longitude: res.longitude
        })
 
        // 获取msite商铺列表
        let offset = 10
        return shopList(this.latitude, this.longitude, offset)
      })
      .then(res => {
        this.shopList = res
      })
      
    // 获取msite页面食品分类列表
    msiteFoodTypes(this.geohash)
      .then(res => {
        this.foodTypes = res
      })
  },

  props: [],

  components: {
    headTop
  },

  computed: {
    ...mapState([
      'geohash',
      'latitude',
      'longitude'
    ]),
  },

  methods: {
    ...mapMutations({
      saveGeohash: SAVE_GEOHASH,
      recordAddress: RECORD_ADDRESS
    }),
  },
}
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	.link_search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
	.msite_title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
	}
	.msite_nav{
		padding-top: 2.1rem;
		background-color: #fff;
		border-bottom: 0.025rem solid $bc;
		height: 10.6rem;
		.swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
				bottom: 0.2rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}
	.food_types_container{
		display:flex;
		flex-wrap: wrap;
		.link_to_food{
			width: 25%;
			padding: 0.3rem 0rem;
			@include fj(center);
			figure{
				img{
					margin-bottom: 0.3rem;
					@include wh(1.8rem, 1.8rem);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
	}
	.shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}

</style>
