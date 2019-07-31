import Vue from "vue";
// import FlockBanner from "./Banner.vue";

// import Selector from "./Selector.vue";
import DynamicSelector from "@/components/DynamicSelector.vue";

// import FTrim from "./functions/Trim.vue";
// import FValue from "./functions/Value.vue";
// import FCase from "./functions/Case.vue";

import global from "@/global.js";

const Components = {
    // FlockBanner,
    // Selector,
    DynamicSelector,

    // FTrim, 
    // FValue, 
    // FCase
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default {
    Components,
    global,
};