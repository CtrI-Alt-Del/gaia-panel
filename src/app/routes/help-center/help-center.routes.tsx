import { createFileRoute, Outlet } from '@tanstack/react-router';
import HelpCenterLayout from './help-center';
import HelpCenterIndex from './help-center._index/route';
import HelpCenterCategory from './help-center.($category)/route';
import HelpCenterDoc from './help-center.($category)/$doc/route';

export const Route = createFileRoute('/help-center')({
  component: HelpCenterLayout,
  children: [
    {
      path: '/',
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

export default function HelpCenterRoutes() {
  return <Outlet />;
}
