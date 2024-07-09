import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import _ from 'lodash'
import { useSelector } from 'react-redux'

const Month = () => {
  // 控制弹框的打开和关闭
  const [dataVisible, setDataVisible] = useState(false)

  // 时间显示
  const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY | MM'))

  const billList = useSelector(state => state.bill.billList)

  // 对数据进行按月分组
  // 计算使用到useMemo
  const monthGroup = useMemo(() => {
    // return出去计算之后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY | MM'))
  }, [billList])

  // 当前选择时间的数据
  const [currentMonthList, setCurrentMonthList] = useState([])
  // 对数据进行处理
  const monthResult = useMemo(() => {
    const pay = currentMonthList && (currentMonthList.filter(item => item.type === 'pay')).reduce((prev, current) => prev + current.money, 0)
    const income = currentMonthList && (currentMonthList.filter(item => item.type === 'income')).reduce((prev, current) => prev + current.money, 0)
    return {
      pay: pay || 0,
      income: income || 0,
      total: pay + income || 0
    }
  }, [currentMonthList])

  // 初始化的时候显示当前月的统计数据
  useEffect(() => {
    const nowDate = dayjs().format('YYYY | MM')
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate])
    }
  }, [monthGroup])

  // 时间选择器点击确认
  const onConfirm = (date) => {
    setDataVisible(false)
    const formatDate = dayjs(date).format('YYYY | MM')
    setCurrentDate(formatDate)
    // 根据当前选择的时间匹配相对应的数据
    setCurrentMonthList(monthGroup[formatDate])
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDataVisible(true)}>
            <span className="text">
              {currentDate}月账单
            </span>
            <span className={classNames('arrow', dataVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dataVisible}
            max={new Date()}
            onCancel={() => setDataVisible(false)}
            onConfirm={onConfirm}
          />
        </div>
      </div>
    </div >
  )
}

export default Month