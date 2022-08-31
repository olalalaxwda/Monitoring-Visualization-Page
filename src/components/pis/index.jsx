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
        return `时间:${e.value}<br>百分比:${e.percent}%`
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

// 性能指标汇总
export default function Index() {
  const pisRef = useRef()
  const [state, setState] = useState(undefined)
  state && pisRef && renderEcharts(state)
  useEffect(() => {
    myChart = echarts.init(pisRef.current);
    window.addEventListener("resize", () => {
      myChart.resize()
    })

    getData("keyperformancedata").then((v) => {
      let dataOb = {
        FP: 0,
        FCP: 0,
        "DOM Ready": 0,
        // DNS: 0,
        "whiteScreenTime": 0
      }
      v.map((item) => {
        dataOb["FCP"] += item.firstContentPaint * 1
        dataOb["FP"] += item.firstPaintTime * 1
        // dataOb["DNS"] += item.dnsTime * 1
        dataOb["DOM Ready"] += item.domReady * 1
        dataOb["whiteScreenTime"] += item.whiteScreenTime * 1

      })


      dataOb["FCP"] /= 1000
      dataOb["FCP"] = dataOb["FCP"].toFixed(2)

      dataOb["FP"] /= 1000
      dataOb["FP"] = dataOb["FP"].toFixed(2)

      dataOb["DNS"] /= 1000
      dataOb["DNS"] = dataOb["DNS"].toFixed(2)

      dataOb["DOM Ready"] /= 1000
      dataOb["DOM Ready"] = dataOb["DOM Ready"].toFixed(2)

      dataOb["whiteScreenTime"] /= 1000
      dataOb["whiteScreenTime"] = dataOb["whiteScreenTime"].toFixed(2)


      setState([
        { value: dataOb["FCP"], name: 'FCP' },
        { value: dataOb["FP"], name: 'FP' },
        { value: dataOb["DNS"], name: 'DNS' },
        { value: dataOb["DOM Ready"], name: 'DOM Ready' },
        { value: dataOb["whiteScreenTime"], name: 'whiteScreenTime' },
      ])
      // console.log(dataOb)
    })
  }, [])
  return (
    <div className='pis' ref={pisRef}>性能指标-汇总 pis</div>
  )
}
