import VueRouter from "vue-router"
import "../public-path"
const routes = [
  {
    path: "/child2/page1",
    component: () => import("../views/page1")
  },
  {
    path: "/child2/page2",
    component: () => import("../views/page2")
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
