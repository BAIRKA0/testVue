<template>
  <div class="main">
    <button @click="openModal">Открыть</button>
    <span v-if="selectedFinalId">ID: {{ selectedFinalId }}</span>
    <Modal 
        v-if="isModalVisible"
        :visible="isModalVisible"
        title="Выберите папку"
        @close="closeModal"
        @confirm="confirmSelection"
    >
        <FolderTree :folders="mockFolders" @select="selectFolder(1)" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from './components/Modal.vue';
import FolderTree from './components/FolderTree.vue';
import { ref, computed } from 'vue';
import type { Folder } from './types/Folder.ts';
import { folderStore } from './stores/folderStore';

const isModalVisible = ref<boolean>(false);
const selectedId = computed(()=> folderStore.selectedId)
const selectFolder = folderStore.selectFolder
const selectedFinalId = ref<Number | null>(null)

const folder = (id: number, name: string, children: Folder[]):Folder => ({id: id, name: name, children: children})
const mockFolders = ref<Folder[]>([
    folder(1,'Папка 1',[
        folder(2,'Папка 1.1',[]),
        folder(3,'Папка 1.2',[
            folder(4,'Папка 1.2.1', [])
        ])
    ]),
    folder(5,'Папка 2',[])
])
const openModal = () => {
    selectFolder(selectedFinalId.value)
    isModalVisible.value = true
};
const closeModal = () => {isModalVisible.value = false};
const confirmSelection = () => {
    console.log('ID папки:', selectedFinalId.value);
    selectedFinalId.value = selectedId.value;
    closeModal();
};

</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
}

button {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}
</style>
