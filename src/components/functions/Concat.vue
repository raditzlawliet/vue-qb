<template>
  <div>
    <div v-if="normalizedTemplateOptions.template =='bs4'">
      <div>
        <slot name="f-concat-begin">
          <label class="col-form-label col-form-label-sm">CONCAT (</label>
        </slot>
        <button :class="[...normalizedTemplateOptions.options.addBtnClass]" @click="addItem">
          <slot name="btn-add">+</slot>
        </button>
      </div>
      <div v-for="(item, index) in query.values" :key="`${item.uuid}`" class="ml-2">
        <slot name="f-concat-value">
          <div class="d-flex d-flex-row">
            <div class="mr-2">
              <button
                :class="[...normalizedTemplateOptions.options.removeBtnClass]"
                :disabled="index == 0"
                @click="removeItem(index)"
              >
                <slot name="btn-remove">X</slot>
              </button>
            </div>
            <div class="flex-grow-1">
              <dynamic-selector
                ref="values_"
                :query="item"
                :templateOptions="templateOptions"
                :path="`${path}.values[${index}]`"
                :rules="rules"
                :depth="depth+1"
              >
                <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
                <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                  <slot :name="name" v-bind="slotData" />
                </template>
              </dynamic-selector>
            </div>
            <div :class="[...normalizedTemplateOptions.options.columnClass]">
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
          :class="[...normalizedTemplateOptions.options.removeBtnClass]"
          v-show="options.removeable && query.type"
          @click="remove"
        >
          <slot name="btn-remove">X</slot>
        </button>
      </div>
    </div>
    <div v-if="normalizedTemplateOptions.template =='bs3'">
      <label class="control-label input-sm">CONCAT (</label>
      <button :class="[...normalizedTemplateOptions.options.addBtnClass]" @click="addItem">
        <slot name="btn-add">+</slot>
      </button>
      <div v-for="(item, index) in query.values" :key="`${item.uuid}`" class="row ml-2">
        <div class="d-flex d-flex-row col-xs-12">
          <div class="mr-2">
            <button
              :class="[...normalizedTemplateOptions.options.removeBtnClass]"
              :disabled="index == 0"
              @click="removeItem(index)"
            >
              <slot name="btn-remove">X</slot>
            </button>
          </div>
          <div class="flex-grow-1">
            <dynamic-selector
              ref="values_"
              :query="item"
              :templateOptions="templateOptions"
              :path="`${path}.values[${index}]`"
              :rules="rules"
              :depth="depth+1"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
          <label style="margin-left: 0.5em;">,</label>
        </div>
      </div>
      <div>
        <label class="control-label input-sm">)</label>
        <button
          :class="[...normalizedTemplateOptions.options.removeBtnClass]"
          v-show="options.removeable && query.type"
          @click="remove"
        >
          <slot name="btn-remove">X</slot>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Placeholder from "./Placeholder.vue";
import { EventBus } from "@/components/event-bus.js";

export default {
  extends: Placeholder,
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {
    if (this.query.values.length == 0) this.addItem();
  },
  updated() {
    if (this.query.values.length == 0) this.addItem();
  },
  methods: {
    generateSQL: function() {
      var values = this.query.values
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
    addItem: function() {
      // this.query.values.push(this.getQueryModel());
      var manipulatedQuery = this.query.values;
      manipulatedQuery.push(this.getQueryModel());
      EventBus.$emit("query-update", this.path + ".values", manipulatedQuery);
      // EventBus.$emit(
      //   "query-update-array",
      //   this.path + ".values",
      //   "push",
      //   this.getQueryModel()
      // );
    },
    removeItem: function(i) {
      // this.query.values.splice(i, 1);
      var manipulatedQuery = this.query.values;
      manipulatedQuery.splice(i, 1);
      EventBus.$emit("query-update", this.path + ".values", manipulatedQuery);
      // EventBus.$emit("query-update-array", this.path + ".values", "remove", i);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
