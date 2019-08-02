<template>
  <div class="selector">
    <slot name="f-case-begin">
      <span>CASE</span>
    </slot>
    <slot name="f-case-when-then">
      <div>
        <span>WHEN</span>
        <dynamic-selector
          ref="whenValue"
          emitRef="whenValue"
          :query="querylocal.whenValue"
          @query-update="onQueryUpdate"
        >
          <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
          <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </dynamic-selector>
        <span>THEN</span>
        <dynamic-selector
          ref="thenValue"
          emitRef="thenValue"
          :query="querylocal.thenValue"
          @query-update="onQueryUpdate"
        >
          <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
          <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </dynamic-selector>
      </div>
    </slot>
    <slot name="f-case-else">
      <span>ELSE</span>
      <dynamic-selector
        ref="elseValue"
        emitRef="elseValue"
        :query="querylocal.elseValue"
        @query-update="onQueryUpdate"
      >
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
import Placeholder from "./Placeholder.vue";
export default {
  extends: Placeholder,
  props: {},
  data() {
    return {};
  },

  methods: {
    generateSQL: function() {
      return `
        CASE
          WHEN ${this.$refs.whenValue.generateSQL()} THEN ${this.$refs.thenValue.generateSQL()}
          ELSE ${this.$refs.elseValue.generateSQL()}
          END
      `;
    },
    // normalizeQuery: function(d) {
    //   return Object.assign(
    //     {
    //       type: "", // for type
    //       // value: undefined, // for value
    //       values: [] // for array
    //     },
    //     d
    //   );
    // }
    // onQueryUpdate: function(emitRef, value) {
    //   this.querylocal[emitRef] = this.normalizeQuery(value);
    // }
  }
};
</script>

<style lang="scss" scoped>
</style>
