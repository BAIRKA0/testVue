<template>
  <div v-if="visible" class="modal-background">
    <div class="modal">
        <header class="modal-header">
            <h2>{{ title }}</h2>
        </header>
        <main class="modal-main">
            <slot></slot>
        </main>
        <footer class="modal-footer">
            <button @click="close" class="close">Close</button>
            <button @click="confirm" class="confirm">OK</button>
        </footer>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
    visible: { 
        type: Boolean,
        required: true,
    },
    title: { 
        type: String,
        required: true,
    },
});

const emit = defineEmits(['close', 'confirm']);

const close = () => emit('close');
const confirm = () => emit('confirm');
</script>

<style scoped>
.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    display: flex;
    flex-direction: column;
    background-color: darkblue;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    height: 300px;
    max-width: 90%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
    text-align: center;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5em;
}

.modal-main {
    margin-top: 10px;
    border: 1px solid;
    flex-grow: 1;
    overflow-y: auto;
}

.modal-footer {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 10px;
}

button {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

.close {
    background-color: red;
}

.close:hover {
    background-color: darkred;
}

.confirm {
    background-color: green;
}

.confirm:hover {
    background-color: darkgreen;
}
</style>