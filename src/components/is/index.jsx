import React, { useEffect, useState, useRef } from 'react'
import "./index.less"
import { getData } from '../../utils/getData'
import * as echarts from 'echarts';

let myChart = undefined
function renderEcharts(data) {
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: (e) => {
        return `数量:${e.value}<br>百分比:${e.percent}%`
      }
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: {
        fontSize: 20,
      },

    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };

  option && myChart.setOption(option);
}

// 接口-汇总
export default function Is() {
  const isRef = useRef()
  const [state, setState] = useState(undefined)
  state && isRef && renderEcharts(state)
  useEffect(() => {
    myChart = echarts.init(isRef.current);
    window.addEventListener("resize", () => {
      myChart.resize()
    })

    Promise.all([getData("apisucceed"), getData("apifailed"),]).then((v) => {
      setState([
        { value: v[0].length, name: '页面访问量' },
        { value: v[1].length, name: '独立访客数' },

      ])
    })
  }, [])


  return (
    <div className='is' ref={isRef}>接口-汇总 is</div>
  )
}
