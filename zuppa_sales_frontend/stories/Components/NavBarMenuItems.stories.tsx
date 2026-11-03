import { NavBarMenuItems } from '@/components/NavBarMenu/NavBarMenuItems';
import type { Meta, StoryObj } from '@storybook/react';
import { FaHome } from 'react-icons/fa';

const meta = {
  title: 'Components/NavBarMenuItems',
  component: NavBarMenuItems,
  argTypes: {
    url: { control: 'text' },
    text: { control: 'text' },
    subMenu: { control: 'text' },
    isRadius: { control: 'boolean' },
    menu: { control: 'text' },
    icon: { control: 'text' },
    settingIcon: { control: 'text' },
    subText: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavBarMenuItems>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: '/home',
    text: 'Home',
    subText: '',
    subMenu: '',
    isRadius: false,
    menu: '',
    icon: <FaHome />,
    settingIcon: <FaHome />,
  },
};

export const ActiveMenu: Story = {
  args: {
    url: '/dashboard',
    text: 'Dashboard',
    subText: '',
    subMenu: '',
    isRadius: false,
    menu: 'Dashboard',
    icon: <FaHome />,
    settingIcon: <FaHome />,
  },
};

export const WithSubMenu: Story = {
  args: {
    url: '/profile',
    subText: '',
    text: 'Profile',
    subMenu: 'Profile',
    isRadius: true,
    menu: '',
    icon: <FaHome />,
    settingIcon: <FaHome />,
  },
};
