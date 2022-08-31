import React, { useRef, useEffect, useState } from 'react'
import { getData } from '../../utils/getData'
import * as echarts from 'echarts'


let myChart = undefined

function renderEcharts(tpData) {
  let option;
  option = {
    title: {
      text: "页面停留时间(毫秒)",
      left: 'right'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['stayTime', 'visibleTime', 'invisibleTime']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: tpData.xData
        // data:['x','y']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'stayTime',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series'
        },
        data: tpData.stayTimeData
        // data:[1,2]
      },
      {
        name: 'visibleTime',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: tpData.visibleTimeData
        // data:[1,2]
      },
      {
        name: 'invisibleTime',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: tpData.invisibleTimeData
        // data:[1,2]
      }
    ]
  };

  option && myChart.setOption(option);
}

export default function Index() {
  const [tpData,setTpData] = useState({
    xData:[],
    stayTimeData:[],
    visibleTimeData:[],
    invisibleTimeData:[]
  })
  const domRef = useRef()

  useEffect(() => {
    myChart = echarts.init(domRef.current)
    window.addEventListener('resize', myChart.resize);

    getData('ps').then((v)=>{
      console.log('ps',v)
      const _data = v
      // 获取每个页面存在/可见时长
      let total_data = _data.reduce((arr, cur) => {
        const index = arr.findIndex(item => item.page === cur.page)
        if (index === -1) {
          arr.push({
            page: cur.page,
            stayTime: Number(cur.stayTime),
            visibleTime: Number(cur.visibleTime),
            invisibleTime: Number(Number(cur.stayTime) - Number(cur.visibleTime))
          })
        }
        if (index > -1) {
          arr[index].stayTime += Number(cur.stayTime)
          arr[index].visibleTime += Number(cur.visibleTime)
          arr[index].invisibleTime += Number(Number(cur.stayTime) - Number(cur.visibleTime))
        }
        return arr
      }, [])
      console.log('total_data', total_data)
      let xData = total_data.reduce((arr, cur) => {
        arr.push(cur.page)
        return arr
      }, [])
      let stayTimeData = total_data.reduce((arr, cur) => {
        arr.push(cur.stayTime)
        return arr
      }, [])
      let visibleTimeData = total_data.reduce((arr, cur) => {
        arr.push(cur.visibleTime)
        return arr
      }, [])
      let invisibleTime = total_data.reduce((arr, cur) => {
        arr.push(cur.invisibleTime)
        return arr
      }, [])
      setTpData({
          xData:xData,
          stayTimeData:stayTimeData,
          visibleTimeData:visibleTimeData,
          invisibleTimeData:invisibleTime
      })
      // tpData.xData = xData
      // tpData.stayTimeData = stayTimeData
      // tpData.visibleTimeData = visibleTimeData
      // tpData.invisibleTimeData = invisibleTime
      console.log('tpData', tpData)
    }
  )
  }, [])


  myChart && tpData && renderEcharts(tpData)
  return (
    <div  ref={domRef}></div>
  )
}

