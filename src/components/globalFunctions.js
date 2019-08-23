// Available components for rules
var lFunctions = {
    "": { id: "", component: () => import("@/components/DynamicSelector.vue") },
    "attribute": { id: "attribute", component: () => import("@/components/functions/Attribute.vue") },
    "case": { id: "case", component: () => import("@/components/functions/Case.vue") },
    "coalesce": { id: "coalesce", component: () => import("@/components/functions/Coalesce.vue") },
    "concat": { id: "concat", component: () => import("@/components/functions/Concat.vue") },
    "count": { id: "lower", component: () => import("@/components/functions/Count.vue") },
    "length": { id: "lower", component: () => import("@/components/functions/Length.vue") },
    "lower": { id: "lower", component: () => import("@/components/functions/Lower.vue") },
    "max": { id: "max", component: () => import("@/components/functions/Max.vue") },
    "min": { id: "min", component: () => import("@/components/functions/Min.vue") },
    "object": { id: "object", component: () => import("@/components/functions/Object.vue") },
    // "split": { id: "split", component: () => import("@/components/functions/Split.vue") },
    "sum": { id: "sum", component: () => import("@/components/functions/Sum.vue") },
    "trim": { id: "trim", component: () => import("@/components/functions/Trim.vue") },
    "upper": { id: "upper", component: () => import("@/components/functions/Upper.vue") },
    "value": { id: "value", component: () => import("@/components/functions/Value.vue") },
    // Coming soon after toposort fixed
    // "Custom": {
    //     id: "Custom", isTemplate: true, functionOptions: {
    //         htmlTemplate: 'CUSTOM ( <dynamic-selector ref="param"></dynamic-selector>, <dynamic-selector ref="param2"></dynamic-selector>)',
    //         generateSQL: 'Custom (#param, #param2)',
    //     }
    // }, // f-custom
};

export default lFunctions