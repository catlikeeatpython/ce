
import Home from '../pages/home/index.jsx';
import Kind from '../pages/kind/index.jsx';
import Cart from '../pages/cart/index.jsx';
import SortTable from '../pages/sortables/index.jsx';
import Date from '../pages/date/index.jsx';

export const routerConfig = [
    {
        path:'/home', // 首页
        component: Home
    },{
        path:'/kind', // 分类
        component: Kind
    },{
        path:'/cart',
        component: Cart
    },{
        path:'/sortTable',
        component: SortTable
    },{
        path:'/date',
        component: Date
    }
];
