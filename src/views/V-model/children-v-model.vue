<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const props = defineProps({
    count: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['update:count'])
</script>
<template>
    <div>
        <h2>子组件当前计数: {{ props.count }}</h2>
        <div>
            <el-button type="primary" @click="emit('update:count', props.count + 1)">增加</el-button>
            <el-button type="danger" @click="emit('update:count', props.count - 1)">减少</el-button>
        </div>
    </div>
</template>
<style scoped></style>
