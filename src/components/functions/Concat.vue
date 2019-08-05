<template>
  <div class="selector">
    <slot name="f-concat-begin">
      <span>CONCAT [</span>
    </slot>
    <button @click="add">+</button>
    <div v-for="(item, index) in querylocal.values" :key="index">
      <slot name="f-concat-value">
        <button v-show="index != 0" @click="remove(index)">X</button>
        <dynamic-selector :ref="`value_`" :query="item.value" @query-update="onQueryUpdate">
          <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
          <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </dynamic-selector>
      </slot>
    </div>
    <slot name="f-concat-end">
      <span>]</span>
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
  created() {
    if (this.querylocal.values.length == 0) this.add();
  },
  updated() {
    if (this.querylocal.values.length == 0) this.add();
  },
  methods: {
    generateSQL: function() {
      var values = this.querylocal.values
        .map((v, i) => {
          // console.log(this.$refs.value_[i], i);
          // dont know why ref already scope in array
          return this.$refs.value_[i] ? this.$refs.value_[i].generateSQL() : "";
        })
        .join(", ");
      return `CONCAT (${values})`;
    },
    // onQueryUpdate: function(q) {
    //   this.querylocal.value = this.normalizeQuery(q);
    // },s
    add: function() {
      this.querylocal.values.push(this.getQueryModel());
    },
    remove: function(i) {
      this.querylocal.values.splice(i, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
