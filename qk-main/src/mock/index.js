import Mock from "mockjs"
const requireComponent = require.context("./modules", true, /\.*\.js$/)
requireComponent.keys().map((fileName) => {
  const item = requireComponent(fileName).default
  if (item) {
    Object.keys(item).forEach((key) => {
      Mock.mock(item[key].url, item[key].type, item[key].response)
    })
  }
})
