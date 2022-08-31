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

// 接口请求成功
export default function Index() {
  const [state, setState] = useState(undefined)
  const rsRef = useRef()

  useEffect(() => {
    myChart = echarts.init(rsRef.current)
    window.addEventListener('resize', myChart.resize);
    let xyLab = {

    }

    getData("apisucceed").then((v) => {
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
    <div className='rs' ref={rsRef}>请求成功 rs</div>
  )
}
