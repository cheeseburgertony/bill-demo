import axios from "axios";
import { createSlice } from "@reduxjs/toolkit"

const billStore = createSlice({
  name: 'bill',
  // 数据转台state
  initialState: {
    billList: []
  },
  // 同步方法
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload
    }
  }
})

// 结构出actionCreator
const { setBillList } = billStore.actions

// 异步方法
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8888/ka')
    // 调用同步方法 需要通过dispatch触发(在内部return的函数的形参获取)
    dispatch(setBillList(res.data))
  }
}
export { getBillList }

// 导出reducer
const reducer = billStore.reducer
export default reducer