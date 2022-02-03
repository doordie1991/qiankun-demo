import VueRouter from "vue-router"
import "../public-path"
const routes = [
  {
    path: "/child1/page1",
    component: () => import("../views/page1")
  },
  {
    path: "/child1/page2",
    component: () => import("../views/page2")
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
