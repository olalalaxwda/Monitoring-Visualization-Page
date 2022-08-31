import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import { getData } from '../../utils/getData'
import "./index.less"

let myChart = undefined

function renderEcharts(state) {
  let option;

  option = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: Object.keys(state)
    },
    yAxis: {
      // show: true,
      type: 'value',
      // scale:true
    },
    series: [
      {
        data: Object.values(state),
        type: 'line',
        markPoint: {
          data: [
            {
              type: 'max'
            },
            {
              type: 'min'
            }
          ]
        },
        markLine: {
          data: [
            {
              type: 'average'
            }

          ]
        }
      }
    ]
  };

  option && myChart.setOption(option);
}



// 资源加载异常
export default function Index() {
  const [state, setState] = useState(undefined)
  const resRef = useRef()
  useEffect(() => {
    myChart = echarts.init(resRef.current)
    window.addEventListener('resize', myChart.resize);
    getData("rse").then((v => {
      let data = {}
      v.map((item) => {
        (data[item.targetClassName] == undefined && (data[item.targetClassName] = 1)) || (data[item.targetClassName] != undefined && (data[item.targetClassName] += 1))
      })
      setState(data)
    }))
  }, [])
  myChart && state && renderEcharts(state)
  return (
    <div className='rse' ref={resRef}>资源加载异常 rse</div>
  )
}
