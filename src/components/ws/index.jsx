import React, { useEffect, useState, useRef } from 'react'
import * as echarts from 'echarts';
import { getData } from '../../utils/getData'
import "./index.less"

let myChart = undefined

function renderEcharts(state) {
  let option;
  option = {
    title: {
      text: "白屏时间(秒)",
      left: 'center'
    },
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


// FCP 这个指标用于记录页面首次绘制文本、图片、非空白 Canvas 或 SVG 的时间。
export default function Index() {
  const [state, setState] = useState(undefined)
  const wsRef = useRef()

  useEffect(() => {
    myChart = echarts.init(wsRef.current)
    window.addEventListener('resize', myChart.resize);
    let xyLab = {

    }

    getData("keyperformancedata").then((v) => {
      // console.log(v)
      v.map((item) => {
        let labKey = item.CreatedAt.split("T")[0];
        (xyLab[labKey] != undefined && (xyLab[labKey] += item.whiteScreenTime * 1)) || (xyLab[labKey] == undefined && (xyLab[labKey] = item.whiteScreenTime * 1))
      })

      for (const key in xyLab) {
        if (Object.hasOwnProperty.call(xyLab, key)) {
          xyLab[key] = (xyLab[key] / 1000).toFixed(2);

        }
      }
      // console.log(xyLab);
      setState(xyLab)
    })
  }, [])


  myChart && state && renderEcharts(state)
  return (
    <div className='ws' ref={wsRef}>FP fp</div>
  )
}
