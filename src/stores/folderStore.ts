import { reactive } from "vue"

export const folderStore = reactive({
    selectedId: null,
    selectFolder: (id: any) => (
        folderStore.selectedId = id
    )
})