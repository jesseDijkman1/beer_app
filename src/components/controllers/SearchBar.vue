<template>
  <div class="search-bar">
    <input
      v-model="value"
      class="search-bar__input font-regular"
      type="text"
      :placeholder="placeholder"
    />
    <span class="search-bar__border-bottom"></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ default: "Search ...", type: String })
  private readonly placeholder!: string;
  @Prop({ default: false, type: Boolean })
  private readonly autoSearch!: boolean;
  @Prop({ default: 1000, type: Number }) private readonly delay!: number;

  private value: string = "";
  private timeout: any;

  @Watch("value")
  private fn(): void {
    if (!this.autoSearch) {
      return;
    }

    clearTimeout(this.timeout);

    if (!this.value) {
      this.$emit("reset");
    } else {
      this.timeout = setTimeout(() => {
        this.$emit("search", this.value);
      }, this.delay);
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  padding: 1em;
  margin-bottom: 1em;
  position: relative;

  &__border-bottom {
    width: 100%;
    height: 2px;
    left: 0;
    bottom: 0;
    position: absolute;
    background: var(--color-main);

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 0%;
      height: 100%;
      background: white;
      left: 0;
      top: 0;
      transition: all 0.2s ease;
    }
  }

  &__input {
    width: 100%;
    color: #888;
    transition: all 0.2s ease;

    &::placeholder {
      color: #888;
      transition: all 0.2s ease;
    }

    &:focus,
    &:focus::placeholder {
      color: white;
    }
  }

  &__input:focus + &__border-bottom::after {
    width: 100%;
  }
}
</style>