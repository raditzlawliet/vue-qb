<template>
  <div :data-depth="depth">
    <div v-if="normalizedTemplateOptions.template =='bs4'">
      <div>
        <label class="col-form-label col-form-label-sm">CASE</label>
        <button :class="[...normalizedTemplateOptions.options.addBtnClass]" @click="addItem">
          <slot name="btn-add">+</slot>
        </button>
      </div>
      <div
        v-for="(whenThen, index) in querylocal.values"
        :key="whenThen.uuid"
        class="form-row d-flex d-flex-row mb-0 ml-1"
      >
        <div class="form-group">
          <div class="mr-1">
            <button
              :class="[...normalizedTemplateOptions.options.removeBtnClass]"
              :disabled="index == 0"
              @click="removeItem(index)"
            >X</button>
          </div>
        </div>
        <div class="form-group flex-grow-1 mr-1 mb-0">
          <label class="col-form-label col-form-label-sm">WHEN (</label>
          <div class="ml-2">
            <dynamic-selector
              @update:query="(q) => onUpdateQueryLocal(whenThen.whenValue, q)"
              ref="whenValue_"
              :query="whenThen.whenValue"
              :templateOptions="templateOptions"
              :path="`${path}.values[${index}].whenValue`"
              :rules="rules"
              :depth="depth+1"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </div>
        <div class="form-group flex-grow-1 ml-1 mb-0">
          <label class="col-form-label col-form-label-sm">THEN</label>
          <div class="ml-2">
            <dynamic-selector
              @update:query="(q) => onUpdateQueryLocal(whenThen.thenValue, q)"
              ref="thenValue_"
              :query="whenThen.thenValue"
              :templateOptions="templateOptions"
              :path="`${path}.values[${index}].thenValue`"
              :rules="rules"
              :depth="depth+1"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </div>
      </div>
      <div>
        <slot name="f-case-else">
          <div>
            <label class="col-form-label col-form-label-sm">ELSE</label>
          </div>
          <div class="ml-2">
            <dynamic-selector
              @update:query="(q) => onUpdateQueryLocal(querylocal.elseValue, q)"
              ref="elseValue"
              :query="querylocal.elseValue"
              :templateOptions="templateOptions"
              :path="`${path}.elseValue`"
              :rules="rules"
              :depth="depth+1"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </slot>
      </div>
      <slot name="f-case-end">
        <label class="col-form-label col-form-label-sm">END</label>
      </slot>
      <button
        :class="[...normalizedTemplateOptions.options.removeBtnClass]"
        v-show="optionslocal.removeable && querylocal.type"
        @click="remove"
      >
        <slot name="btn-remove">X</slot>
      </button>
    </div>
    <div v-if="normalizedTemplateOptions.template =='bs3'">
      <div>
        <label class="control-label input-sm">CASE</label>
        <button :class="[...normalizedTemplateOptions.options.addBtnClass]" @click="addItem">
          <slot name="btn-add">+</slot>
        </button>
      </div>
      <div
        v-for="(whenThen, index) in querylocal.values"
        :key="whenThen.uuid"
        class="form-row d-flex d-flex-row mb-0 ml-1"
      >
        <div class="form-group">
          <div class="mr-1">
            <button
              :class="[...normalizedTemplateOptions.options.removeBtnClass]"
              :disabled="index == 0"
              @click="removeItem(index)"
            >X</button>
          </div>
        </div>
        <div class="form-group flex-grow-1 mr-1 mb-0">
          <label class="control-label input-sm">WHEN</label>
          <div class="ml-2">
            <dynamic-selector
              @update:query="(q) => onUpdateQueryLocal(whenThen.whenValue, q)"
              ref="whenValue_"
              :query="whenThen.whenValue"
              :templateOptions="templateOptions"
              :path="`${path}.values[${index}].whenValue`"
              :rules="rules"
              :depth="depth+1"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </div>
        <div class="form-group flex-grow-1 ml-1 mb-0">
          <label class="control-label input-sm">THEN</label>
          <div class="ml-2">
            <dynamic-selector
              @update:query="(q) => onUpdateQueryLocal(whenThen.thenValue, q)"
              ref="thenValue_"
              :query="whenThen.thenValue"
              :templateOptions="templateOptions"
              :path="`${path}.values[${index}].thenValue`"
              :rules="rules"
              :depth="depth+1"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </div>
      </div>
      <div>
        <slot name="f-case-else">
          <div>
            <label class="control-label input-sm">ELSE</label>
          </div>
          <div class="ml-2">
            <dynamic-selector
              @update:query="(q) => onUpdateQueryLocal(querylocal.elseValue, q)"
              ref="elseValue"
              :query="querylocal.elseValue"
              :templateOptions="templateOptions"
              :path="`${path}.elseValue`"
              :rules="rules"
              :depth="depth+1"
            >
              <!-- <slot v-for="(_, name) in $slots" :name="name" :slot="name" /> -->
              <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
              </template>
            </dynamic-selector>
          </div>
        </slot>
      </div>
      <slot name="f-case-end">
        <label class="control-label input-sm">END</label>
      </slot>
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
import { EventBus } from "@/components/event-bus.js";
import { deepClone, replaceTemplate } from "@/utilities.js";

export default {
  extends: Placeholder,
  props: {},
  data() {
    return {
      defaultSqlFormat: `CASE
  {{whenThenValues}}
  ELSE {{elseValue}}
END`,
      defaultWhenThenFormat: `WHEN {{whenValue}} THEN {{thenValue}}`,
      defaultsqlMultivaluedSeparator: "\n"
    };
  },
  computed: {
    whenThenFormat() {
      return this.rules.whenThenFormat || this.defaultWhenThenFormat;
    },
    sqlFormatScoped() {
      return replaceTemplate(this.sqlFormat, {
        values: `{{${this.querylocal.uuid}}}`
      });
    }
  },
  created() {
    if (this.querylocal.values.length == 0) this.addItem();
  },
  updated() {
    if (this.querylocal.values.length == 0) this.addItem();
  },
  methods: {
    generateSQL: function() {
      //       var whenThenValues = this.querylocal.values
      //         .map((v, i) => {
      //           var whenValue = this.$refs.whenValue_[i]
      //             ? this.$refs.whenValue_[i].generateSQL()
      //             : "";
      //           var thenValue = this.$refs.thenValue_[i]
      //             ? this.$refs.thenValue_[i].generateSQL()
      //             : "";
      //           return `WHEN ${whenValue} THEN ${thenValue}`;
      //         })
      //         .join("\n");
      //       return `CASE
      //   ${whenThenValues}
      //   ELSE ${this.$refs.elseValue.generateSQL()}
      // END`;
      var whenThenValues = this.querylocal.values
        .map((v, i) => {
          var whenValue = replaceTemplate(this.valueWrapper, {
            value: this.$refs.whenValue_[i]
              ? this.$refs.whenValue_[i].generateSQL()
              : ""
          });
          var thenValue = replaceTemplate(this.valueWrapper, {
            value: this.$refs.thenValue_[i]
              ? this.$refs.thenValue_[i].generateSQL()
              : ""
          });
          return replaceTemplate(this.defaultWhenThenFormat, {
            whenValue: whenValue,
            thenValue: thenValue
          });
        })
        .join(this.defaultsqlMultivaluedSeparator);
      return replaceTemplate(this.sqlFormat, {
        whenThenValues: whenThenValues,
        elseValue: replaceTemplate(this.valueWrapper, {
          value: this.$refs.elseValue.generateSQL()
        })
      });
    },
    addItem: function() {
      this.querylocal.values.push({
        uuid: this.generateUUID(),
        whenValue: this.getQueryModel(),
        thenValue: this.getQueryModel()
      });
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
    onUpdateQueryLocal: function(oldQuery, query) {
      // console.log(i, query);
      // this.querylocal.values.splice(i, 1, deepClone(query));
      oldQuery = deepClone(query);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
