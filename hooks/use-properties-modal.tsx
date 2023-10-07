import {create} from 'zustand';

interface usePropertyModalStore {
    // open modal trigger
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=> void

    // data to retrieve data
    // id: string;
    // name: string;
    // value: string;
    // setName: (dataName: string) => void ;
    // setValue: (datValue: string) => void ;
    // setId: (dataId: string) => void ;
};

// creating a Store to manage  pop-up state across the app
export const useColorModal = create<usePropertyModalStore>((set) => ({
    // setting default values
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false}),

    // id: "",
    // name: "",
    // value: "",
    // setName: (dataName: string) => set({name: dataName}),
    // setValue: (dataValue: string) => set({value : dataValue}),
    // setId: (dataId: string) => set({id : dataId}),
}))

export const useSizeModal = create<usePropertyModalStore>((set) => ({
    // setting default values
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false}),

    // id: "",
    // name: "",
    // value: "",
    // setName: (dataName: string) => set({name: dataName}),
    // setValue: (dataValue: string) => set({value : dataValue}),
    // setId: (dataId: string) => set({id : dataId}),
}))
