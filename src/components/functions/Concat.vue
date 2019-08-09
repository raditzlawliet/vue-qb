<template>
  <div>
    <div>
      <slot name="f-concat-begin">
        <label class="col-form-label col-form-label-sm">CONCAT (</label>
      </slot>
      <button :class="[...normalizedTemplateOptions.addBtnClass]" @click="addItem">
        <slot name="btn-add">+</slot>
      </button>
    </div>
    <div v-for="(item, index) in querylocal.values" :key="index" class="ml-2">
      <slot name="f-concat-value">
        <div class="d-flex d-flex-row">
          <div class="mr-2">
            <button
              :class="[...normalizedTemplateOptions.removeBtnClass]"
              :disabled="index == 0"
              @click="removeItem(index)"
            >
              <slot name="btn-remove">X</slot>
            </button>
          </div>
          <div class="flex-grow-1">
            <dynamic-selector
              ref="values_"
              :emitRef="`values_${index}`"
              :query="item"
              @query-update="onQueryUpdate"
              :templateOptions="templateOptions"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
          <div :class="[...normalizedTemplateOptions.columnClass]">
            <slot name="f-concat-separator">
              <label style="margin-left: 0.5em;">,</label>
            </slot>
          </div>
        </div>
      </slot>
    </div>
    <div>
      <slot name="f-concat-end">
        <label class="col-form-label col-form-label-sm">)</label>
      </slot>
      <button
        :class="[...normalizedTemplateOptions.removeBtnClass]"
        v-show="optionslocal.removeable && querylocal.type"
        @click="remove"
      >
        <slot name="btn-remove">X</slot>
      </button>
    </div>
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
    if (this.querylocal.values.length == 0) this.addItem();
  },
  updated() {
    if (this.querylocal.values.length == 0) this.addItem();
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
