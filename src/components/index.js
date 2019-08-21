import Vue from "vue";

import DynamicSelector from "@/components/DynamicSelector.vue";
import VueQueryBuilder from "@/components/VueQueryBuilder.vue";

import globalFunctions from "@/components/globalFunctions.js";
import globalSettings from "@/components/globalSettings.js";

const Components = {
    DynamicSelector,
    VueQueryBuilder,
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

Object.keys(globalFunctions).forEach(name => {
    if (name && globalFunctions[name].component && !globalFunctions[name].isCustom) {
        Vue.component("F" + name, globalFunctions[name].component);
    }
});

export default {
    Components,
    globalFunctions,
    globalSettings,
};