<template>
  <div v-if="show" class="x-context-menu" :style="style">
    <slot></slot>
    <input
      type="text"
      readonly="readonly"
      autocomplete="off"
      class="x-context-menu--input"
      @blur="handleBlur"
      ref="contextmenu"
    >
  </div>
</template>

<script>
export default {
  name: "XContextMenu",
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: false,
      default: "text"
    }
  },
  data() {
    return {
      style: { top: 0, left: 0 },
      options: [],
      value: "",
      top: false
    };
  },
  created() {
    this.$bus.on("contextMenu", this.handleContextMenu);
  },
  beforeDestroy() {
    this.$bus.off("contextMenu", this.handleContextMenu);
  },
  methods: {
    handleContextMenu(e, options, type = "text") {
      this.$nextTick().then(() => this.$refs.contextmenu.focus());
    },
    handleBlur() {
      this.$emit("update:show", false);
      this.$bus.emit("contextMenuOff");
    },
    handleChange(val) {
      if (val !== "") {
        this.$bus.emit("contextMenuSelected", val);
        this.value = "";
      }
    }
  }
};
</script>

