import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/getData'
import * as echarts from 'echarts';
import "./index.less"


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


// 异常与错误-汇总
export default function Index() {
  const eesRef = React.useRef()
  const [data, setData] = useState(undefined)

  if (data && myChart && eesRef) {
    renderEcharts(data)
  }


  useEffect(() => {
    Promise.all([getData("jspe"), getData("reject"), getData("rse")]).then((v) => {
      setData([
        { value: v[0].length, name: 'js语法错误' },
        { value: v[1].length, name: '未捕获reject' },
        { value: v[2].length, name: '资源加载异常' },
      ])
    })
    myChart = echarts.init(eesRef.current);
    let windowResizeFunc = () => {
      myChart.resize()
    }
    window.addEventListener("resize", windowResizeFunc)

  }, [])

  return (
    <div className='ees' ref={eesRef}></div>
  )
}
