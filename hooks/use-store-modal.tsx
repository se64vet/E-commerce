import {create} from 'zustand';

interface useStoreModalStore {
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=> void
};

// creating a Store to manage  pop-up state across the app
export const useStoreModal = create<useStoreModalStore>((set) => ({
    // setting default values
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false}),
}))
