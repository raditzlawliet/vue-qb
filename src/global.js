// global.js
// keep is simple for global ... 
var lFunctions = {
    "": { id: "", component: () => import("@/components/DynamicSelector.vue") },
    "Trim": { id: "Trim", component: () => import("@/components/functions/Trim.vue") },
    "Concat": { id: "Concat", component: () => import("@/components/functions/Concat.vue") },
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

// var recursiveScope = `
// <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
// <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
//   <slot :name="name" v-bind="slotData" />
// </template>
// `

// for recursive scope, will include for isTemplate=true
var recursiveScope = `
<template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
  <slot :name="name" v-bind="slotData" />
</template>
`

export default {
    lFunctions,
    recursiveScope,
}