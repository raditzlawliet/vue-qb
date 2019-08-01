// global.js
// keep is simple for global ... 
var lFunctions = {
    "": { id: "", component: () => import("@/components/DynamicSelector.vue") },
    "Trim": { id: "Trim", component: () => import("@/components/functions/Trim.vue") },
    "Case": { id: "Case", component: () => import("@/components/functions/Case.vue") },
    "Object": { id: "Object", component: () => import("@/components/functions/Value.vue") },
    "Attribute": { id: "Attribute", component: () => import("@/components/functions/Value.vue") },
    "Value": { id: "Value", component: () => import("@/components/functions/Value.vue") },
    "Custom": {
        id: "Custom", isTemplate: true, templateOptions: {
            template: 'CUSTOM ( <dynamic-selector ref="param"></dynamic-selector>, <dynamic-selector ref="param2"></dynamic-selector>)',
            generateSQL: 'Custom (#param, #param2)',
        }
    }, // f-custom
};

export default {
    lFunctions
}