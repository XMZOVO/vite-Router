const About = () => import('./views/About.vue')
const NotFound = () => import('./views/NotFound.vue')
const Tools = () => import('./views/tools/Tools.vue')
const Dat2CSV = () => import('./views/tools/Dat2CSV.vue')
const Main = () => import('./views/tools/Main.vue')
const Test = () => import('./views/tools/Test.vue')
const JSRoot = () => import('./views/tools/JSRoot.vue')
const WebG4 = () => import('./views/WebG4.vue')
const Three = () => import('./views/Three.vue')
const Blender = () => import('./views/Blender.vue')
const Home = () => import('./views/Home.vue')
const App = () => import('./App.vue')
const MainPage = () => import('./views/MainPage.vue')

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: '/',
    component: App,
    meta: { title: 'App' },
    children: [
      {
        path: '',
        component: MainPage,
        children: [{
          path: '',
          component: Home,
          children: [{
            path: '',
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
          }]
        },

        {
          path: '/webG4',
          name: 'webG4',
          meta: { keepAlive: true },
          component: WebG4,
        },]
      }
    ],
  },
  {
    path: '/three',
    name: 'three',
    meta: { keepAlive: false },
    component: Three,
  },
  {
    path: '/blender',
    name: 'blender',
    meta: { keepAlive: false },
    component: Blender,
  },
  { path: '/:path(.*)', component: NotFound },
]
