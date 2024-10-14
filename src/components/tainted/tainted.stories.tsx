import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {tainted} from './tainted';

const meta: Meta<typeof tainted> = {
  component: tainted,
};

export default meta;

type Story = StoryObj<typeof tainted>;

export const Basic: Story = {args: {}};
