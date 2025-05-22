<template>
    <div class="w-full relative">
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
        <UiSelect
            :id="id"
            v-model="value"
            :tabindex="tabindex"
            :required="required"
            :variant="variant"
            :name="name"
            ref="input"
            :size="size"
            :options="options"
            :disabled="disabled"
            v-bind="$attrs"
            :placeholder="placeholder"
            @blur="handleBlur"
        >
                <option :class="[ variant == 'filled' ? 'bg-background' : 'bg-background dark:bg-dark-background']" disabled value="">یک مورد را انتخاب کنید.</option>
                <template v-for="option in options" >
                    <slot name="option" :option="option" />
                </template>
        </UiSelect>
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
        default: undefined,
    },
    tabindex: {
        type: [String, Number],
        required: false,
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
    options: {
        type: [Array, Object],
        default: [],
    },
    modelValue: {
        type: [String, Number, Boolean, Object, Array],
        required: false,
        default: ''
    },
    variant: {
        type: String,
        default: "filled",
    },
    size: {
        type: String,
        default: "default",
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
} = useField(props.name || props.id, undefined, {
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

const input = ref(null)
const focusInput = async () => {
  await nextTick()
  if (input.value) {
    input.value.focus();
  }
};
defineExpose({
  focusInput
})
</script>