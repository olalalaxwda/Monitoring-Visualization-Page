import React, { useRef, useEffect, useState } from 'react'
import * as echarts from 'echarts'
import "./index.less"
import { getData } from '../../utils/getData'


let myChart = undefined

function renderEcharts(pvUvData) {
  let option;
  option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['PV', 'UV']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: pvUvData.xData
      // data:['x','y','z']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'PV',
        type: 'line',
        stack: 'Total',
        data: pvUvData.pvData
        // data:[1,2,3]
      },
      {
        name: 'UV',
        type: 'line',
        stack: 'Total',
        data: pvUvData.uvData
        // data:[1,2,3]
      }
    ]
  };

  option && myChart.setOption(option);
}


export default function Index() {
  const [pvUvData,setpvUvData] = useState({
    xData:[],
    pvData:[],
    uvData:[]
  })

  const domRef = useRef()

  useEffect(() => {
    myChart = echarts.init(domRef.current)
    window.addEventListener('resize', myChart.resize);
    
    Promise.all([getData('pvInfo'),getData('uvInfo')]).then((v)=>{
      const resPv = v[0]
      const resUv = v[1]
      console.log('resPv',resPv)
      console.log('resUv',resUv)
      const _pvData = resPv
      const _uvData = resUv
      _pvData.forEach(item => {
        item.CreatedAt = item.CreatedAt.substring(0, 10)
      })
      // console.log('_pvData',_pvData)
      let __pvData = _pvData.reduce((arr, cur) => {
        const index = arr.findIndex(item => item.time === cur.CreatedAt)
        if (index === -1) {
          arr.push({
            time: cur.CreatedAt,
            pvNum: 1
          })
        }
        if (index > -1) {
          arr[index].pvNum++
        }
        return arr
      }, [])
      console.log('__pvData', __pvData)
      const xData = __pvData.reduce((arr, cur) => {
        arr.push(cur.time)
        return arr
      }, [])
      const pvData = __pvData.reduce((arr, cur) => {
        arr.push(cur.pvNum)
        return arr
      }, [])
      console.log('xData', xData)
      console.log('pvData', pvData)
      _uvData.forEach(item => {
        item.CreatedAt = item.CreatedAt.substring(0, 10)
      })
      let __uvData = _uvData.reduce((arr, cur) => {
        const index = arr.findIndex(item => item.time === cur.CreatedAt)
        if (index === -1) {
          arr.push({
            time: cur.CreatedAt,
            uvNum: 1
          })
        }
        if (index > -1) {
          arr[index].uvNum++
        }
        return arr
      }, [])
      let uvData = __uvData.reduce((arr, cur) => {
        arr.push(cur.uvNum)
        return arr
      }, [])
      console.log('uvData', uvData)
      setpvUvData({
          xData:xData,
          pvData:pvData,
          uvData:uvData
      })
      // pvUvData.xData = xData
      // pvUvData.pvData = pvData
      // pvUvData.uvData = uvData
    })
  }, [])


  myChart && pvUvData && renderEcharts(pvUvData)
  return (
    <div ref={domRef}></div>
  )
}

