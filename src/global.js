// global.js
// keep is simple for global ... 
var lFunctions = {
    "": { id: "", component: () => import("@/components/DynamicSelector.vue") },
    "trim": { id: "trim", component: () => import("@/components/functions/Trim.vue") },
    "case": { id: "case", component: () => import("@/components/functions/Case.vue") },
    "object": { id: "object", component: () => import("@/components/functions/Value.vue") },
    "attribute": { id: "attribute", component: () => import("@/components/functions/Value.vue") },
    "value": { id: "value", component: () => import("@/components/functions/Value.vue") },
};

export default {
    lFunctions
}