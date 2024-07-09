import { getBillList } from "@/store/modules/billStore"
import { Button } from "antd-mobile"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"

const Layout = () => {
  // 渲染时触发方法获取数据
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])

  return (
    <div>
      <Outlet />
      我是Layout
      {/* 测试全局生效样式 */}
      <Button color="primary">测试全局样式</Button>
      <div className="puple">
        <Button color="primary">测试局部样式</Button>
      </div>
    </div>
  )
}

export default Layout