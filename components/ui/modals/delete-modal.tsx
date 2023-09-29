'use client'

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { Modal } from '@/components/ui/modal'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface deleteModalProps {
    storeId: string,
    open : boolean
    setClose : ()=>void,
}

export const DeleteModal = ({storeId, open, setClose} : deleteModalProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${storeId}`);
            setClose();
            toast.success("Store deleted")
            router.push("/")
        } catch (error) {
            toast.error("Something wrong happend.")
        } finally {
            setLoading(false)
        }
    }

    const onCancel = () => {
        setClose();
    }

  return (
    <>
        <Modal 
        title='Are you sure?' 
        description='Deleted store will not be able to restored'
        isOpen ={open}
        onClose={setClose}
        >
            <div className='flex justify-end gap-2'>
                <Button 
                disabled={loading} 
                variant={'outline'}
                onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                disabled={loading}
                variant={"destructive"}
                onClick={onDelete}
                >
                    {loading?"Please wait...":"Delete"}
                </Button>
            </div>
        </Modal>
    </>
  )
}

