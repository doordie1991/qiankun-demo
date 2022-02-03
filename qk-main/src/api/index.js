window.$api = {} 

let apis = {}
const requireComponent = require.context('./service', true, /\.*\.js$/)
requireComponent.keys().map(fileName => {
  const name = fileName.replace('./', '').replace('.js', '')
  const api = requireComponent(fileName).default
  apis[name] = api(name)
})

$api['main'] = apis