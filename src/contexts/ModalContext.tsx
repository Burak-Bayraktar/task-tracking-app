import { createContext, useContext, useState } from "react";

type Modal = {
    name: string;
    data: any;
}

type ModalContextProps = {
    modals: Modal[] | null;
    addModal: (name: string, data: any) => void;
    removeModal: (name: string) => void;
};

export const ModalContext = createContext<ModalContextProps>({
    modals: [],
    addModal: () => {},
    removeModal: () => {},
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modals, setModals] = useState<Modal[]>([]);
    
    const addModal = (name: string, data: any) => {
        setModals([...modals, { name, data }]);
    };

    const removeModal = (name: string) => {
        setModals(modals.filter((modal) => modal.name !== name));
    };

    const values = { modals, addModal, removeModal };
    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    );
};