import { ComponentStory, ComponentMeta } from "@storybook/react";

import AdvertisementCardSkeleton from "../components/AdvertisementCardSkeleton";

export default {
  title: "Advertisements/AdvertisementCard",
  component: AdvertisementCardSkeleton,
  parameters: {
    layout: "padded",
  },
} as ComponentMeta<typeof AdvertisementCardSkeleton>;

const Template: ComponentStory<typeof AdvertisementCardSkeleton> = () => (
  <AdvertisementCardSkeleton />
);

export const Acs = Template.bind({});

Acs.args = {};
