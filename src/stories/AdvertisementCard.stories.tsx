import { ComponentStory, ComponentMeta } from "@storybook/react";

import AdvertisementCard from "../components/AdvertisementCard";

export default {
  title: "Advertisements/AdvertisementCard",
  component: AdvertisementCard,
  parameters: {
    layout: "padded",
  },
} as ComponentMeta<typeof AdvertisementCard>;

const Template: ComponentStory<typeof AdvertisementCard> = (args) => (
  <AdvertisementCard {...args} />
);

export const Ac = Template.bind({});

Ac.args = {};
