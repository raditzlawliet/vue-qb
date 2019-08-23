<template>
  <div :data-depth="depth">
    <div v-if="normalizedTemplateOptions.template =='bs4'">
      <div>
        <slot name="f-lower-begin">
          <label class="col-form-label col-form-label-sm">LOWER (</label>
        </slot>
      </div>
      <div class="ml-2">
        <slot name="f-lower-value">
          <dynamic-selector
            ref="value"
            :query="querylocal.value"
            :templateOptions="templateOptions"
            :path="`${path}.value`"
            :rules="rules"
            :depth="depth+1"
          >
            <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
              <slot :name="name" v-bind="slotData" />
            </template>
          </dynamic-selector>
        </slot>
      </div>
      <div>
        <slot name="f-lower-end">
          <label class="col-form-label col-form-label-sm">)</label>
        </slot>
        <button
          :class="[...normalizedTemplateOptions.options.removeBtnClass]"
          v-show="optionslocal.removeable && querylocal.type"
          @click="remove"
        >
          <slot name="btn-remove">X</slot>
        </button>
      </div>
    </div>
    <div v-if="normalizedTemplateOptions.template =='bs3'">
      <label class="control-label input-sm">LOWER (</label>
      <div class="ml-2">
        <dynamic-selector
          ref="value"
          :query="querylocal.value"
          :templateOptions="templateOptions"
          :path="`${path}.value`"
          :rules="rules"
          :depth="depth+1"
        >
          <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
          <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </dynamic-selector>
      </div>
      <label class="control-label input-sm">)</label>
      <button
        :class="[...normalizedTemplateOptions.options.removeBtnClass]"
        v-show="myrule.isRemoveable(myrule, depth, querylocal) && querylocal.type"
        @click="remove"
      >
        <slot name="btn-remove">X</slot>
      </button>
    </div>
  </div>
</template>
<script>
import Placeholder from "./Placeholder.vue";
import { replaceTemplate } from "@/utilities.js";

export default {
  extends: Placeholder,
  props: {},
  data() {
    return {
      templateId: "lower",
      defaultSqlFormat: "LOWER ({{value}})"
    };
  },
  computed: {
    sqlFormatScoped() {
      return replaceTemplate(this.sqlFormat, {
        value: `{{${this.querylocal.uuid}}}`
      });
    }
  },
  methods: {
    generateSQL: function() {
      return replaceTemplate(this.sqlFormat, {
        value: replaceTemplate(this.valueWrapper, {
          value: this.$refs.value.generateSQL()
        })
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
