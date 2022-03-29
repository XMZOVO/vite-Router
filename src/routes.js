import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Tools from './views/tools/Tools.vue'
import Dat2CSV from './views/tools/Dat2CSV.vue'
import Main from './views/tools/Main.vue'
import Test from './views/tools/Test.vue'
import JSRoot from './views/tools/JSRoot.vue'
import WebG4 from './views/WebG4.vue'
import Three from './views/Three.vue'

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
        meta: { transition: 'slide-left' },
        children: [{
          path: '',
          component: Main,
        }, {
          path: '/dat2csv',
          component: Dat2CSV,
        }, {
          path: '/test',
          component: Test
        }, {
          path: '/jsroot',
          component: JSRoot,
          name: JSRoot
        },

        ]
      }
    ],
  },
  {
    path: '/webG4',
    name:'webG4',
    meta: { keepAlive: true },
    component: WebG4,
  },
  {
    path: '/three',
    name:'three',
    meta: { keepAlive: true },
    component: Three,
  },
  { path: '/:path(.*)', component: NotFound },
]
