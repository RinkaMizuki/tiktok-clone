import config from '~/config';

//layouts
import { HeaderOnly } from '~/layouts';

//Pages
import Home from '~/pages/Home';
import Follow from '~/pages/Follow';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';

//public routes
const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.following,
    component: Follow,
  },
  {
    path: config.routes.profile,
    component: Profile,
  },
  {
    path: config.routes.search,
    component: Search,
    layout: null,
  },
  {
    path: config.routes.live,
    component: Live,
  },
  {
    path: config.routes.upload,
    component: Upload,
    layout: HeaderOnly,
  },
];

//private routes

const privateRoutes = [];

export { publicRoutes, privateRoutes };
