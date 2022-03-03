import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Tools from './views/tools/Tools.vue'
import Dat2CSV from './views/tools/view/Dat2CSV.vue'
import ToolsMain from './views/tools/view/Main.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: 'Home' },
    children: [
      {
        path: "",
        component: Tools,
        meta: { title: 'Tools' },
        children: [{
          path:'',
          component:ToolsMain,
        }, {
          path: '/dat2csv',
          component: Dat2CSV,
        }]
      }
    ],
  },
  {
    path: '/about',
    meta: { title: 'About' },
    component: About,
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue')
  },
  { path: '/:path(.*)', component: NotFound },
]
