import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'

const DailyBill = ({ date, billList }) => {
  // 对数据进行处理
  const dayResult = useMemo(() => {
    const pay = billList && (billList.filter(item => item.type === 'pay')).reduce((prev, current) => prev + current.money, 0)
    const income = billList && (billList.filter(item => item.type === 'income')).reduce((prev, current) => prev + current.money, 0)
    return {
      pay: pay || 0,
      income: income || 0,
      total: pay + income || 0
    }
  }, [billList])

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DailyBill