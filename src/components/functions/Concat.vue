<template>
  <div class="selector">
    <slot name="f-concat-begin">
      <label>CONCAT (</label>
    </slot>
    <button class="btn btn-success btn-sm ml-2" @click="addItem">+</button>
    <div v-for="(item, index) in querylocal.values" :key="index" class="row">
      <slot name="f-concat-value">
        <div class="col-md-12 d-flex flex-row">
          <div>
            <button class="btn btn-danger btn-sm" :disabled="index == 0" @click="removeItem(index)">X</button>
          </div>
          <div class="flex-grow-1">
            <dynamic-selector
              ref="values_"
              :emitRef="`values_${index}`"
              :query="item"
              @query-update="onQueryUpdate"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
          <label class="ml-2">,</label>
        </div>
      </slot>
    </div>
    <slot name="f-concat-end">
      <label>)</label>
    </slot>
    <button
      class="btn btn-danger btn-sm ml-2"
      v-show="optionslocal.removeable && querylocal.type"
      @click="remove"
    >X</button>
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
          return this.$refs.values_[i]
            ? this.$refs.values_[i].generateSQL()
            : "";
        })
        .join(", ");
      return `CONCAT (${values})`;
    },
    // onQueryUpdate: function(q) {
    //   this.querylocal.value = this.normalizeQuery(q);
    // },s
    addItem: function() {
      this.querylocal.values.push(this.getQueryModel());
    },
    removeItem: function(i) {
      this.querylocal.values.splice(i, 1);
    },
    onQueryUpdate: function(emitRef, value) {
      if (emitRef.startsWith("values_")) {
        let index = emitRef.split("_").pop();
        this.querylocal.values[index] = this.normalizeQuery(value);
      } else {
        this.querylocal[emitRef] = this.normalizeQuery(value);
      }
      this.$emit("query-update", this.emitRef, this.querylocal);
      // console.log(emitRef, JSON.stringify(this.querylocal));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
