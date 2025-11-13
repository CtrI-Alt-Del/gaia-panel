import { createFileRoute } from '@react-router/dev';
import HelpCenterLayout from './help-center';
import HelpCenterIndex from './help-center._index/route';
import HelpCenterCategory from './help-center.($category)/route';
import HelpCenterDoc from './help-center.($category)/$doc/route';

export const helpCenterRoute = createFileRoute('/help-center')({
  component: HelpCenterLayout,
  children: [
    {
      index: true,
      component: HelpCenterIndex,
    },
    {
      path: ':category',
      component: HelpCenterCategory,
    },
    {
      path: ':category/:doc',
      component: HelpCenterDoc,
    },
  ],
});
