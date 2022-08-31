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


// 请求失败
export default function Index() {

  const [state, setState] = useState(undefined)
  const rfRef = useRef()
  useEffect(() => {
    myChart = echarts.init(rfRef.current)
    window.addEventListener('resize', myChart.resize);
    let xyLab = {

    }

    getData("apifailed").then((v) => {
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
    <div className='rf' ref={rfRef}>请求失败 rf</div>
  )
}
