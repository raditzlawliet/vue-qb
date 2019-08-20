// Available components for rules
var lFunctions = {
    "": { id: "", component: () => import("@/components/DynamicSelector.vue") },
    "Trim": { id: "Trim", component: () => import("@/components/functions/Trim.vue") },
    "Concat": { id: "Concat", component: () => import("@/components/functions/Concat.vue") },
    "Case": { id: "Case", component: () => import("@/components/functions/Case.vue") },
    "Object": { id: "Object", component: () => import("@/components/functions/Object.vue") },
    "Attribute": { id: "Attribute", component: () => import("@/components/functions/Attribute.vue") },
    "Value": { id: "Value", component: () => import("@/components/functions/Value.vue") },
    // Coming soon after toposort fixed
    // "Custom": {
    //     id: "Custom", isTemplate: true, functionOptions: {
    //         htmlTemplate: 'CUSTOM ( <dynamic-selector ref="param"></dynamic-selector>, <dynamic-selector ref="param2"></dynamic-selector>)',
    //         generateSQL: 'Custom (#param, #param2)',
    //     }
    // }, // f-custom
};

export default lFunctions