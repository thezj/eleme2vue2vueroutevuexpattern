//引入路由匹配组件

const homepage = () =>
    import ('../pages/home/index.vue')


//定义路由
let routelist = [{
    path: '/',
    component: homepage
}]

export default routelist