const routes = [{
  path: '/', 
  children: [
  {
    name: 'helloWorld',
    path: 'helloworld',
    component: () => import('@/components/HelloWorld.vue')
  }]
}]

export default routes
