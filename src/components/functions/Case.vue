<template>
  <div class="selector">
    <slot name="f-case-begin">
      <span>CASE</span>
    </slot>
    <slot name="f-case-when-then">
      <div>
        <span>WHEN</span>
        <dynamic-selector ref="whenValue">
          <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
          <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </dynamic-selector>
        <span>THEN</span>
        <dynamic-selector ref="thenValue">
          <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
          <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </dynamic-selector>
      </div>
    </slot>
    <slot name="f-case-else">
      <span>ELSE</span>
      <dynamic-selector ref="elseValue">
        <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </dynamic-selector>
    </slot>
    <slot name="f-case-end">
      <span>END</span>
    </slot>
  </div>
</template>
<script>
import global from "@/global.js";

export default {
  props: {},
  data() {
    return {
      type: ""
    };
  },
  methods: {
    generateSQL: function() {
      return `
        CASE
          WHEN ${this.$refs.whenValue.generateSQL()} THEN ${this.$refs.thenValue.generateSQL()}
          ELSE ${this.$refs.elseValue.generateSQL()}
          END
      `;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
