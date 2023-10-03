'use client'

import { Modal } from '@/components/ui/modal'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface deleteModalProps {
    loading: boolean,
    open : boolean
    setClose : ()=>void,
    onConfirm : ()=>void,

    title?: string,
    description?: string
}

export const DeleteModal = ({
    loading, 
    open, 
    setClose, 
    onConfirm,
    title = "Are you sure?",
    description = "This action cannot be undone"
} : deleteModalProps) => {
    const router = useRouter();

  return (
    <>
        <Modal 
        title={title}
        description={description}
        isOpen ={open}
        onClose={setClose}
        >
            <div className='flex justify-end gap-2'>
                <Button 
                disabled={loading} 
                variant={'outline'}
                onClick={setClose}
                >
                    Cancel
                </Button>
                <Button
                disabled={loading}
                variant={"destructive"}
                onClick={onConfirm}
                >
                    {loading?"Please wait...":"Delete"}
                </Button>
            </div>
        </Modal>
    </>
  )
}

