import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBillList } from '@/store/modules/billStore'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()

  // 支出和收入状态
  const [billType, setBillType] = useState('pay')
  const [money, setMoney] = useState(0)
  const [useFor, setUseFor] = useState('')

  const changeMoney = (value) => {
    setMoney(value)
  }

  // 时间选择器
  const [dateVisiable, setDateVisiable] = useState(false)
  const [date, setDate] = useState(new Date())
  const onConfirm = (value) => {
    setDate(value)
  }

  // 提交表单保存
  const dispatch = useDispatch()
  const saveBill = () => {
    // 收集表单
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : +money,
      date,
      useFor: useFor
    }
    dispatch(addBillList(data))
    // 提交表单后返回上一页
    setTimeout(() => {
      navigate(-1)
    }, 200)
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisiable(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisiable}
                onConfirm={onConfirm}
                onClose={() => setDateVisiable(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={changeMoney}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New