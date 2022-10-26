import { ComponentStory, ComponentMeta } from "@storybook/react";

import BottomNav from "../components/BottomNav";

export default {
    title: "Bottom Navigation",
    component: BottomNav,
    parameters: {
        layout: "padded",
    },
} as ComponentMeta<typeof BottomNav>;

const Template: ComponentStory<typeof BottomNav> = (args) => (
    <BottomNav {...args} />
);

export const BottomNavigation = Template.bind({});

BottomNavigation.args = {
    navigateFunction: () => {
        console.log("navigate");
    },
};
