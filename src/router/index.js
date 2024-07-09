const { default: Layout } = require("@/pages/Layout");
const { default: Month } = require("@/pages/Month");
const { default: New } = require("@/pages/New");
const { default: Year } = require("@/pages/Year");
const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'month',
        element: <Month />
      },
      {
        path: 'year',
        element: <Year />
      }
    ]
  },
  {
    path: '/new',
    element: <New />
  }
])

export default router