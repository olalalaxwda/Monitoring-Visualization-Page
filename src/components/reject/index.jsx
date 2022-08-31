import React, { useEffect, useState, useRef } from 'react'
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
      show: true,
      type: 'value'
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

// // 未捕获reject
export default function Index() {
  const [state, setState] = useState(undefined)
  const rejectRef = useRef()
  useEffect(() => {
    myChart = echarts.init(rejectRef.current)
    window.addEventListener('resize', myChart.resize);
    let xyLab = {

    }

    getData("reject").then((v) => {
      v.map((item) => {
        let labKey = item.CreatedAt.split("T")[0];
        (xyLab[labKey] != undefined && (xyLab[labKey] += 1)) || (xyLab[labKey] == undefined && (xyLab[labKey] = 1))
      })
      console.log(xyLab);
      setState(xyLab)
    })
  }, [])

  myChart && state && renderEcharts(state)
  return (
    <div className='reject' ref={rejectRef}>未捕获reject reject</div>
  )
}
