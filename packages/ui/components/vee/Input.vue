<template>
    <div :class="['w-full relative', props.class ]">
        <UiLabel
            v-if="label"
            :for="id"
            :variant="variant"
            :disabled="disabled"
            class="pb-2"
            :class="{'text-lg' : !value && variant == 'standard'}"
        >
            <span>
                {{ label }}
                <span v-if="required">*</span>
                <span class="text-xs text-text-foreground dark:text-dark-text-foreground">{{ description }}</span>
            </span>
        </UiLabel>
        <UiInput
            :id="id"
            v-model="value"
            :placeholder="placeholder"
            :type="type"
            ref="inputRef"
            :tabindex="tabindex"
            :inputmode="inputmode"
            :required="required"
            :autocomplete="autocomplete"
            :name="name"
            :variant="variant"
            :maxlength="maxlength"
            :disabled="disabled"
            :size="size"
            v-bind="$attrs"
            @blur="handleBlur"
        />
        <span v-if="meta.valid || (errorMessage && ignoreErrorMessage == false)"
            class="absolute w-full flex items-center font-medium truncate tracking-wide text-red-500 text-xs mt-1 ml-1">
            {{ errorMessage }}
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    class: {
        type: [String, Array, Object],
        default: undefined,
    },
    id: {
        type: String,
        default: undefined,
    },
    name: {
        type: String,
        default: undefined,
    },
    label: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        default: undefined,
    },
    placeholder: {
        type: String,
        default: '',
    },
    tabindex: {
        type: [String, Number],
        required: false,
    },
    inputmode: {
        type: String,
        default: "text",
    },
    maxlength: {
        type: Number,
        required: false,
        default: 524288,
    },
    autocomplete: {
        type: String,
        default: 'off',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
    autocomplete: {
        type: String,
        default: "text",
    },
    type: {
        type: String,
        default: "text",
    },
    modelValue: {
        type: [String, Number, Boolean, Object, Array],
        default: undefined,
    },
    variant: {
        type: String,
        default: "filled",
    },
    size: {
        type: String,
    },
    ignoreErrorMessage: {
        type: Boolean,
        default: false,
    },
});

const modelValue = toRef(props, "modelValue");
const {
  errorMessage,
  value,
  handleBlur,
  meta,
} = useField(props.name || id, undefined, {
  validateOnMount: false,
  validateOnValueUpdate: false,
  valueProp: modelValue.value,
  label: props.label,
  initialValue: modelValue.value,
  syncVModel: true,
});
watch(() => modelValue.value, (new_val) => {
    value.value = new_val
})
const inputRef = useTemplateRef('inputRef')
const focusInput = async () => {
  await nextTick()
  if (inputRef.value) {
    inputRef.value.focusInput();
  }
};
defineExpose({
  focusInput
})
</script>