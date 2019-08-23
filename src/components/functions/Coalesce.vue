<template>
  <div :data-depth="depth">
    <div v-if="normalizedTemplateOptions.template =='bs4'">
      <div>
        <slot name="f-coalesce-begin">
          <label class="col-form-label col-form-label-sm">COALESCE (</label>
        </slot>
        <button :class="[...normalizedTemplateOptions.options.addBtnClass]" @click="addItem">
          <slot name="btn-add">+</slot>
        </button>
      </div>
      <div v-for="(item, index) in querylocal.values" :key="`${item.uuid}`" class="ml-2">
        <slot name="f-coalesce-value">
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
                @update:query="(q) => onUpdateQueryLocal(index, q)"
                ref="values_"
                :query="querylocal.values[index]"
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
              <slot name="f-coalesce-separator">
                <label style="margin-left: 0.5em;">,</label>
              </slot>
            </div>
          </div>
        </slot>
      </div>
      <div>
        <slot name="f-coalesce-end">
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
      <label class="control-label input-sm">COALESCE (</label>
      <button :class="[...normalizedTemplateOptions.options.addBtnClass]" @click="addItem">
        <slot name="btn-add">+</slot>
      </button>
      <div v-for="(item, index) in querylocal.values" :key="`${index}`" class="row ml-2">
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
              @update:query="(q) => onUpdateQueryLocal(index, q)"
              ref="values_"
              :query="querylocal.values[index]"
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
          v-show="myrule.isRemoveable(myrule, depth, querylocal) && querylocal.type"
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
import { deepClone, replaceTemplate } from "@/utilities.js";

export default {
  extends: Placeholder,
  props: {},
  data() {
    return {
      templateId: "coalesce",
      defaultSqlFormat: "COALESCE ({{values}})"
    };
  },
  created() {
    if (this.querylocal.values.length == 0) this.addItem();
  },
  updated() {
    if (this.querylocal.values.length == 0) this.addItem();
  },
  computed: {
    sqlFormatScoped() {
      return replaceTemplate(this.sqlFormat, {
        values: `{{${this.querylocal.uuid}}}`
      });
    }
  },
  methods: {
    generateSQL: function() {
      var values = this.querylocal.values
        .map((v, i) => {
          return replaceTemplate(this.valueWrapper, {
            value: this.$refs.values_[i]
              ? this.$refs.values_[i].generateSQL()
              : ""
          });
        })
        .join(this.sqlMultivaluedSeparator);
      return replaceTemplate(this.sqlFormat, {
        values: values
      });
    },
    addItem: function() {
      this.querylocal.values.push(this.getQueryModel());
      EventBus.$emit(
        "update:complete-query",
        this.path + ".values",
        this.querylocal.values
      );
    },
    removeItem: function(i) {
      this.querylocal.values.splice(i, 1);
      EventBus.$emit(
        "update:complete-query",
        this.path + ".values",
        this.querylocal.values
      );
    },
    onUpdateQueryLocal: function(i, query) {
      this.querylocal.values.splice(i, 1, deepClone(query));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
