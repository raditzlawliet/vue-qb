// var recursiveScope = `
// <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
// <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
//   <slot :name="name" v-bind="slotData" />
// </template>
// `

var lObjects = {
    "Some Object": { id: "Some Object", name: "Some Object" },
};

var lAttributes = {
    "Some Attribute": { id: "Some Attribute", name: "Some Attribute" },
};

// for recursive scope, will include for isTemplate=true
var recursiveScope = `
<template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
  <slot :name="name" v-bind="slotData" />
</template>
`

export default {
    lObjects,
    lAttributes,
    recursiveScope,
}