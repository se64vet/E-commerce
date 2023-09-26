// CREATE STORE MODAL
'use client';

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";


export const StoreModal = () => {
    const storeModal = useStoreModal();

    return (
        <Modal 
            title="CREATE STORE"
            description="Adding new store to the system"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
        </Modal>
    )
}