<template>
    <div
        class="menu"
        v-for="folder in folders"
    >
        <div >
            <span class="drop-down" v-if="hasChildren(folder)" @click="toggle(folder)">{{ folder.isOpen ? '-' : '+' }}</span>
            <span class="folder" :class="{ selected: selectedId === folder.id }" @click="console.log(folder); selectFolder(folder.id); ">
                {{ folder.name }}
            </span>
        </div>
        <div v-show="folder.isOpen" class="children">
            <FolderTree
                v-for="child in folder.children"
                :folders="[child]"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Folder } from '../types/Folder.ts';
import { folderStore } from '../stores/folderStore';

const props = defineProps({
    folders: {
        type: Array as () => Folder[],
        required: true,
    },
});
const selectedId = computed(()=> folderStore.selectedId)
const selectFolder = folderStore.selectFolder
const emit = defineEmits(['select']);
const toggle = (folder: Folder) => {
    folder.isOpen = !folder.isOpen;
};
const hasChildren = (folder: Folder) => {
    return folder.children && folder.children.length > 0;
};
</script>

<style scoped>
.menu {
    margin-left: 20px;
}

.selected {
    font-weight: bold;
    color: green;
}

.drop-down {
    cursor: pointer;
}

.folder {
    cursor: pointer;
    margin-left: 4px;
}

.children {
    margin-left: 20px;
}
</style>