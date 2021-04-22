<template>
	<view class="content">
		<view class="charts-box">
			<qiun-data-charts 
				type="pie" 
				:chartData="chartData2" 
				background="none" 
				:animation="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="ring" 
				:chartData="chartData2" 
				background="none" 
				:animation="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="rose" 
				:chartData="chartData2" 
				background="none" 
				:animation="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="word" 
				:chartData="chartData3" 
				background="none" 
				:animation="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="funnel" 
				:chartData="chartData2" 
				background="none" 
				:animation="true"/>
		</view>
		<!-- <view class="charts-box">
			<qiun-data-charts 
				type="map" 
				:chartData="" 
				background="none" 
				:animation="true"/>
		</view> -->
		<view class="charts-box">
			<qiun-data-charts 
				type="arcbar" 
				:chartData="chartData4" 
				background="none" 
				:animation="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="demotype" 
				:chartData="chartData8" 
				background="none" 
				:animation="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="line" 
				:errorShow="false"
				:chartData="chartData1" 
				background="none" 
				:animation="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="column" 
				:errorShow="false"
				:chartData="chartData1" 
				background="none" 
				:animation="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="area" 
				:errorShow="false"
				:chartData="chartData1" 
				background="none" 
				:animation="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="radar" 
				:errorShow="false"
				:chartData="chartData1" 
				background="none" 
				:animation="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="gauge" 
				:errorShow="false"
				:chartData="chartData5" 
				background="none" 
				:animation="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="candle" 
				:errorShow="false"
				:chartData="chartData6" 
				background="none" 
				:animation="true"
				:ontouch="true"/>
		</view>
		<view class="charts-box">
			<qiun-data-charts 
				type="mix" 
				:errorShow="false"
				:chartData="chartData7" 
				background="none" 
				:animation="true"/>
		</view>
		
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				chartData1: {
					categories:['2016','2017','2018','2019','2020','2021'],
					series:[{
					  name:'目标值',
					  data:[35, 36, 31, 33, 13, 34]
					 },{
					  name:'完成量',
					  data:[18, 27, 21, 24, 10, 28]
					 }]
				},
				chartData2:{
					series:[{
						data: [{
							  name: '一班',
							  value: 50
						  }, {
							  name: '二班',
							  value: 30
						  }, {
							  name: '三班',
							  value: 20
						  }, {
							  name: '四班',
							  value: 18
						  }, {
							  name: '五班',
							  value: 8
						  }]
					}]
				},
				chartData3:{
					"series": [
						{
							"name": "跨全端图表",
							"textSize": 25
						},
						{
							"name": "微信小程序",
							"textSize": 20
						},
						{
							"name": "支付宝小程序",
							"textSize": 20
						},
						{
							"name": "百度小程序",
							"textSize": 20
						},
						{
							"name": "QQ小程序",
							"textSize": 20
						},
						{
							"name": "头条小程序",
							"textSize": 20
						},
						{
							"name": "抖音小程序",
							"textSize": 20
						},
						{
							"name": "360小程序",
							"textSize": 20
						},
						{
							"name": "跨全端",
							"textSize": 10
						},
						{
							"name": "跨全端",
							"textSize": 12
						},
						{
							"name": "跨全端",
							"textSize": 10
						},
						{
							"name": "跨全端",
							"textSize": 12
						},
						{
							"name": "跨全端",
							"textSize": 10
						},
						{
							"name": "跨全端",
							"textSize": 12
						},
						{
							"name": "跨全端",
							"textSize": 10
						},
						{
							"name": "跨全端",
							"textSize": 12
						}
					]
				},
				chartData4:{
					"series": [
						{
							"name": "正确率",
							"data": 0.8,
							"color": "#2fc25b"
						}
					]
				},
				chartData5:{
					"categories": [
						{
							"value": 0.2,
							"color": "#1890ff"
						},
						{
							"value": 0.8,
							"color": "#2fc25b"
						},
						{
							"value": 1,
							"color": "#f04864"
						}
					],
					"series": [
						{
							"name": "完成率",
							"data": 0.66
						}
					]
				},
				chartData6:{
					"categories": [
						"2020/2/4",
						"2020/2/5",
						"2020/2/6",
						"2020/2/7",
						"2020/2/8",
						"2020/2/18",
						"2020/2/19",
						"2020/2/20",
						"2020/2/21",
						"2020/2/22",
						"2020/2/25",
						"2020/2/26",
						"2020/2/27",
						"2020/2/28"
					],
					"series": [
						{
							"name": "上证指数",
							"data": [
								[
									2320.26,
									2302.6,
									2287.3,
									2362.94
								],
								[
									2300,
									2291.3,
									2288.26,
									2308.38
								],
								[
									2295.35,
									2346.5,
									2295.35,
									2346.92
								],
								[
									2347.22,
									2358.98,
									2337.35,
									2363.8
								],
								[
									2360.75,
									2382.48,
									2347.89,
									2383.76
								],
								[
									2383.43,
									2385.42,
									2371.23,
									2391.82
								],
								[
									2377.41,
									2419.02,
									2369.57,
									2421.15
								],
								[
									2425.92,
									2428.15,
									2417.58,
									2440.38
								],
								[
									2411,
									2433.13,
									2403.3,
									2437.42
								],
								[
									2432.68,
									2434.48,
									2427.7,
									2441.73
								],
								[
									2430.69,
									2418.53,
									2394.22,
									2433.89
								],
								[
									2416.62,
									2432.4,
									2414.4,
									2443.03
								],
								[
									2441.91,
									2421.56,
									2415.43,
									2444.8
								],
								[
									2420.26,
									2382.91,
									2373.53,
									2427.07
								]
							]
						}
					]
				},
				chartData7:{
					"categories": [
						"2016",
						"2017",
						"2018",
						"2019",
						"2020",
						"2021"
					],
					"series": [
						{
							"name": "曲面",
							"data": [
								70,
								50,
								85,
								130,
								64,
								88
							],
							"type": "area",
							"style": "curve"
						},
						{
							"name": "柱1",
							"index": 1,
							"data": [
								40,
								30,
								55,
								110,
								24,
								58
							],
							"type": "column"
						},
						{
							"name": "柱2",
							"index": 1,
							"data": [
								50,
								20,
								75,
								60,
								34,
								38
							],
							"type": "column"
						},
						{
							"name": "曲线",
							"data": [
								70,
								50,
								85,
								130,
								64,
								88
							],
							"type": "line",
							"style": "curve",
							"color": "#1890ff",
							"disableLegend": true
						},
						{
							"name": "折线",
							"data": [
								120,
								140,
								105,
								170,
								95,
								160
							],
							"type": "line",
							"color": "#2fc25b"
						},
						{
							"name": "点",
							"index": 2,
							"data": [
								100,
								80,
								125,
								150,
								112,
								132
							],
							"type": "point",
							"color": "#f04864"
						}
					]
				},
				chartData8:{
					"series": [
						{
							"name": "1",
							"data": 0.2,
							"color": "#1890FF"
						},{
							"name": "2",
							"data": 0.4,
							"color": "#91CB74"
						},{
							"name": "3",
							"data": 0.6,
							"color": "#FAC858"
						},{
							"name": "4",
							"data": 0.8,
							"color": "#EE6666"
						},{
							"name": "5",
							"data": 0.9,
							"color": "#73C0DE"
						}
					]
				},
			};
		}
	}
</script>

<style>
	.charts-box {
		width: 100%;
		height:600rpx;
	}
</style>
