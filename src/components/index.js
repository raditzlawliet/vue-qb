import Vue from "vue";
// import FlockBanner from "./Banner.vue";

// import Selector from "./Selector.vue";
import DynamicSelector from "@/components/DynamicSelector.vue";

// import FTrim from "./functions/Trim.vue";
// import FValue from "./functions/Value.vue";
// import FCase from "./functions/Case.vue";

import globalFunctions from "@/components/globalFunctions.js";
import globalSettings from "@/components/globalSettings.js";

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

Object.keys(globalFunctions).forEach(name => {
    if (name && globalFunctions[name].component && !globalFunctions[name].isCustom) {
        // console.log('Register Component', "F" + name)
        Vue.component("F" + name, globalFunctions[name].component);
    }
});

export default {
    Components,
    globalFunctions,
    globalSettings,
};