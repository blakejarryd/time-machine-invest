import { FC, useState, useEffect } from 'react'
import { Price } from '../models/models'
import { useParams } from "react-router-dom";
import ReactECharts from 'echarts-for-react';
import { blue } from '@mui/material/colors';


interface SharePricesProps {
  ticker: string
}

const SharePrices = ({ ticker }: SharePricesProps) => {
  const [prices, setShare] = useState<Price[]>([])
  const [graphDates, setGraphDates] = useState<string[]>([])
  const [graphPrices, setGraphPrices] = useState<number[]>([])

  const fetchPriceInfo: Function = () => {
    fetch(`http://127.0.0.1:4999/prices/${ticker}`)
    .then(response => response.json())
    .then(prices => setShare(prices)) 
  }
  
  useEffect(() => {
    fetchPriceInfo()
  }, [ticker])


  const populateGraphDates = () => {
    let dateSeries:string[] = []
    for (let el of prices) {
      dateSeries.push(el.Date!)
    }
    return dateSeries.reverse()
  }

  const populateGraphPrices = () => {
    let priceSeries:number[]  = []
    for (let el of prices) {
      priceSeries.push(el.Price!)
    }
    return priceSeries.reverse()
  }

  useEffect(() => {
    setGraphDates(populateGraphDates())
    setGraphPrices(populateGraphPrices())
  }, [prices])


  const options = {
    tooltip: {
      trigger: 'axis',
    },
    title: {
      left: 'center',
      text: ticker + ' price history'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: graphDates
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        filterMode: 'filter',
        type: 'inside',
        start: 90,
        end: 100
      },
      {
        start: 90,
        end: 100
      }
    ],
    series: [
      {
        name: 'Share Price',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: '#03254c'
        },
        areaStyle: {
          color: '#187bcd'
        },
        data: graphPrices
      }
    ]
  };
    
  
  let priceList = prices.map((p) => {
    return (
      <li>{p.Date}: {p.Price}</li>
    )
  })

  return (
    <>
      <p>Prices</p>
      <ReactECharts option={options} />
      {/* {priceList} */}
    </>
  )
}

export default SharePrices