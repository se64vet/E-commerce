'use client';

import { useState, useEffect } from "react";

import { StoreModal } from "@/components/ui/modals/store-modal";

// 1. this provider will wrap around <body> tag in layout.tsx to 
// ensure triggering CREATESTORE modal from any component of the App.y

// 2. But since ModalProvider is a 'client component', we can't really 
// add it to 'server component' in Layout.tsx. That may cause "hydration error"
// The error means that there is a mismatch state in server and client side that will
// cause misrendering.

// 3. To prevent "hydration error" we can apply simple method using 
// "isMounted" state. This ensure return component as null when it's in server
// and render it as UI component when it's in client side.

export const ModalProvider = () => {
    // 4. 'isMounted' is a state that detect if this component 
    // is rendered in client or it still in server
    const [isMounted, setIsMounted] = useState(false);
    
    // 5. useEffect kicks in whenever component rendered in client side
    // that's why we use it here. Whenever this provider is in client
    // it will update value of isMounted to 'true'.
    useEffect(() => {
      setIsMounted(true);
    }, [])
    
    // 6. isMounted == false means that component is in server side
    // It will be rendered as null
    if(!isMounted){
        return null;
    }

    // 7. Opposite, if this component is in client side
    // it will render StoreModal UI component
    return (
        <>
        {/* THIS CAN BE CONTAINER OF OTHER MODALS THAT NEEDS TO BE ACCESSED ANYWHERE FROM THE APP */}
            <StoreModal/>
        </>
    )
}
