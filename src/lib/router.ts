import { intItem } from '../types/router.interface';

export const routes: intItem[] = [
  { name: 'Home', slug: '/', icon: 'home' },
  {
    name: 'Planets',
    slug: '/planets',
    icon: 'rocket_launch',
  },
  { name: 'blog', slug: '/blog', icon: 'edit_square' },
  {
    name: 'showLinks',
    slug: '/showLinks',
    icon: 'bug_report',
  },
  { name: 'post', slug: '/post', icon: 'pin_invoke' },
  {
    name: 'posts',
    slug: '/posts',
    icon: 'watch_screentime',
  },
  {
    name: 'posts/preview',
    slug: '/posts/preview',
    icon: 'webhook',
  },
  {
    name: 'api/getLinks',
    slug: '/api/getLinks',
    icon: 'church',
  },
];
