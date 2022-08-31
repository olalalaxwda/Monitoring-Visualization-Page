import React, { useEffect, useRef, useState } from 'react'
import "./index.less"
import * as echarts from 'echarts';
import { getData } from '../../utils/getData'


let myChart = undefined
let overPoint = undefined


function renderEcharts(state) {

  let xAr = []
  let yAr = []

  let pointNum = {}

  state.map((item) => {

    (pointNum[item[0] + "," + item[1]] == undefined && (pointNum[item[0] + "," + item[1]] = 1)) || (pointNum[item[0] + "," + item[1]] != undefined && (pointNum[item[0] + "," + item[1]] += 1))
    xAr.push(item[0])
    yAr.push(item[1])
  })

  xAr = [...new Set(xAr)]
  yAr = [...new Set(yAr)]
  xAr.reverse()
  yAr.reverse()

  let option = {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'max-height:155px;overflow-y: scroll',
      enterable: true, // 鼠标是否可进入提示框浮层中
      position: function (point, params, dom, rect, size) {
        return [point[0], point[1]]
      },
      formatter: (e) => {
        if (overPoint == undefined)
          return
        let index = 0
        e.map((item) => {
          if (item.data[0] == overPoint[0] && item.data[1] == overPoint[1]) {
            index += 1
          }

        })
        if (index == 0)
          return
        return `日期:${overPoint[0]}<br>错误信息:${overPoint[1]} <br>数量:${index}`
      }
    },
    xAxis: {
      data: xAr,
      // boundaryGap: false,
    },
    yAxis: {
      data: yAr,
      // boundaryGap: false,
    },
    series: [
      {
        // symbolSize: 20,
        data: state,
        type: 'effectScatter',
        rippleEffect: {
          scale: 2
        },

        symbolSize: (e) => {
          return pointNum[e[0] + "," + e[1]] * 5
        },
        itemStyle: {
          color: (e) => {
            if (pointNum[e.data[0] + "," + e.data[1]] < 5) {
              return "#66CCCC"
            }
            if (pointNum[e.data[0] + "," + e.data[1]] < 10) {
              return "#FF9999"
            }
            if (pointNum[e.data[0] + "," + e.data[1]] < 100) {
              return "#FF6666"
            }
            if (pointNum[e.data[0] + "," + e.data[1]] < 1000) {
              return "#993366"
            }
            if (pointNum[e.data[0] + "," + e.data[1]] < 10000) {
              return "#FFCC33"
            }
            return "#CC0033"

          }
        }
      }
    ]
  };
  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

}


// js语法错误
export default function Index() {
  const [state, setState] = useState(undefined)
  const jspeRef = useRef()
  useEffect(() => {


    myChart = echarts.init(jspeRef.current)
    myChart.on("mouseover", (p) => {
      overPoint = p.data
    })
    window.addEventListener('resize', myChart.resize);


    getData("jspe").then((v) => {
      v = v.reverse()
      let echartsData = []
      v.map((item) => {
        echartsData.push([item.CreatedAt.split("T")[0], item.message.split(": ")[1]])
      })
      setState(echartsData)
    })

  }, [])

  myChart && state && jspeRef && renderEcharts(state)

  return (
    <div className='jspe' ref={jspeRef}>js语法错误 jspe</div>
  )
}
