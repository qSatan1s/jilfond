<script setup lang="ts">
import {
  ComponentPublicInstance,
  computed,
  ref,
  onMounted,
  StyleValue,
} from 'vue';

interface Props {
  modelValue: number | string;
  label?: string;
  type?: 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;

  isError?: boolean;
  select?: boolean;

  styleInput?: StyleValue;
  styleInner?: StyleValue;
  styleBody?: StyleValue;
  height?: string | number;
  width?: string | number;

  bottomBorder?: boolean;
  outline?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  bottomBorder: false,
  isError: false,
  height: 46,
  styleInput: () => '',
  styleInner: () => '',
  styleBody: () => '',
});

const emit = defineEmits(['update:modelValue', 'inputMounted', 'onEnter', 'onDelete']);

const inputRef = ref<ComponentPublicInstance | HTMLInputElement | null>(null);

const input = computed(
    () => (inputRef.value as ComponentPublicInstance)?.$el ?? inputRef.value,
);

const focused = ref(false);

const handleFocus = (value: boolean):void => {
  focused.value = value;
};


const changeValue = (value = ''):void => emit('update:modelValue', value);

const onInput = ({ target }: Event):void => changeValue((target as HTMLInputElement).value);

const onAccept = (value: string): void => changeValue(value);

const stylesWrapper = computed<Record<string, string|number>>(() => ({
  height: `${props.height}px`,
  width: props.width ? `${props.width}px` : '',
}));

onMounted(() => {
  emit('inputMounted', input.value);
});

defineExpose({ input });
</script>

<template>
  <label
    :class="[
      'input',
      {
        disabled: disabled,
        readonly: readonly,
        bottomBorder,
        'input-outline': outline,
      },
      $attrs.class,
    ]"
    :style="stylesWrapper"
  >
    <div class="flame-input__container">

      <div
        class="body"
        :style="styleBody"
      >
        <div
          class="width-wrapper"
          :style="$slots.suffix ? { width: 'auto' } : {}"
        >
          <div
            class="inner-container"
            :style="styleInner"
          >
            <input
              ref="inputRef"
              :value="modelValue"
              :placeholder="placeholder"
              :readonly="readonly"
              :disabled="disabled"
              :type="type"
              v-bind="(({ class: c, style, ...rest }) => rest)($attrs)"
              :style="styleInput"
              @input="onInput"
              @accept="onAccept"
              @focus="handleFocus(true)"
              @blur="handleFocus(false)"
              @keyup.enter="emit('onEnter')"
              @keyup.delete="emit('onDelete')"
            >
          </div>

          <slot name="inner" />
        </div>

      </div>
    </div>
  </label>
</template>


<style scoped lang="scss">
.input {
  position: relative;
  display: flex;
  gap: 0.3rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  padding: .5rem 1rem;
  border-radius: .5rem;
  color: black;
  box-shadow: 0 0 0 1px #E9ECEF inset;
  font-weight: normal;
  font-size: 0.8rem;
  cursor: text;
}




.input :where(input::-webkit-outer-spin-button, input::-webkit-inner-spin-button) {
  margin: 0;
  -webkit-appearance: none;
}

.flame-input__container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  height: 100%;
}

.body {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  transition: opacity 200ms ease;
}

.width-wrapper {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  overflow: hidden;
  width: 100%;
  min-width: 0.06rem;
  max-width: 100%;
  height: 100%;
  white-space: nowrap;
}

.width-wrapper span {
  padding: 0 1px;
  white-space: pre;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.input input {
  width: 100%;
  outline: none;
}

.inner-container {
  position: absolute;
  left: 0;
  width: 100%;
}

.input input::placeholder {
  color: var(--c-value);
}

.input:focus-within:not(.readonly) {
  box-shadow: 0 0 0 2px #d8dcdf inset;
}
</style>
