import { BreadCrumb } from '@/components/BreadCrumb/BreadCrumb';
import '@/components/BreadCrumb/BreadCrumb.css';
import { BreadCrumbProps, IBreadCrumbProps } from '@/components/types';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/BreadCrumb',
  component: BreadCrumb,
  argTypes: {
    breadCrumb: { control: 'object' },
  },
  tags: ['autodocs'],
} as Meta<IBreadCrumbProps>;

const Template: StoryFn<IBreadCrumbProps> = (args: IBreadCrumbProps) => <BreadCrumb {...args} />;

export const Default = Template.bind({});
Default.args = {
  breadCrumb: [
    {
      title: 'Home',
      isTitle: true,
      breadCrumb: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Settings', url: '/settings' },
      ],
    },
    {
      title: 'Profile',
      isSubTitle: true,
      breadCrumb: [
        { title: 'Edit Profile', url: '/profile/edit' },
        { title: 'Change Password', url: '/profile/change-password' },
      ],
    },
  ] as BreadCrumbProps[],
};

export const Empty = Template.bind({});
Empty.args = {
  breadCrumb: [],
};

export const SingleLevel = Template.bind({});
SingleLevel.args = {
  breadCrumb: [
    {
      title: 'Home',
      isTitle: true,
    },
  ] as BreadCrumbProps[],
};

export const MultiLevel = Template.bind({});
MultiLevel.args = {
  breadCrumb: [
    {
      title: 'Home',
      isTitle: true,
      breadCrumb: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Reports', url: '/reports' },
        { title: 'Analytics', url: '/analytics' },
        { title: 'Dept Dashboard', url: '/dept_dashboard' },
      ],
    },
  ] as BreadCrumbProps[],
};
