// var recursiveScope = `
// <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
// <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
//   <slot :name="name" v-bind="slotData" />
// </template>
// `

var lObjects = {
  "Some Object": { id: "Some Object", name: "Some Object", sqlValue: "Hehe" },
  "Some Object1": { id: "Some Object1", name: "Some Object1", sqlValue: "Hehe1" },
};

var lAttributes = {
  "Some Attribute": { id: "Some Attribute", name: "Some Attribute", sqlValue: "Hehe" },
};

// for recursive scope, will include for isTemplate=true
var recursiveScope = `
<template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
  <slot :name="name" v-bind="slotData" />
</template>
`

var lRules = {
  "": {
    funcId: "",
    type: "selector",
    label: " -- Select -- ",
    maxDepth: -1,
  },
  "Case": {
    funcId: "Case",
    type: "statement",
    label: "Case",
    maxDepth: -1,
    list: () => {
      return lObjects;
    }
  },
  "Trim": {
    funcId: "Trim",
    type: "function",
    maxDepth: -1,
    label: "Trim",
  },
  "Concat": {
    funcId: "Concat",
    type: "function",
    maxDepth: -1,
      label: "Concat",
  },
  "Object": {
    funcId: "Object",
    type: "value",
    label: "Table / Object",
    maxDepth: -1,
    list: () => {
      return lObjects;
    }
  },
  "Attribute": {
    funcId: "Attribute",
    type: "value",
    label: "Column / Attribute",
    maxDepth: -1,
    list: () => {
      return lAttributes;
    }
  },
  "Value": {
    funcId: "Value",
    type: "value",
    label: "Value",
    maxDepth: -1,
  },
  "Manual": {
    funcId: "Value",
    type: "value",
    label: "Manual",
    maxDepth: -1,
  },
};

// var globalRulesx = {
//   "": { id: "", component: () => import("@/components/DynamicSelector.vue") },
//   "Trim": { id: "Trim", component: () => import("@/components/functions/Trim.vue") },
//   "Concat": { id: "Concat", component: () => import("@/components/functions/Concat.vue") },
//   "Case": { id: "Case", component: () => import("@/components/functions/Case.vue") },
//   "Object": { id: "Object", component: () => import("@/components/functions/Object.vue") },
//   "Attribute": { id: "Attribute", component: () => import("@/components/functions/Attribute.vue") },
//   "Value": { id: "Value", component: () => import("@/components/functions/Value.vue") },
// }

export default {
  lObjects,
  lAttributes,
  recursiveScope,
  lRules,
}