import {
    Dialog,
    ModalOverlay,
    DialogTrigger,
    Modal,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export default function TorusDialog({ triggerElement, children, classNames }: any) {
    return (
        <DialogTrigger>
            {triggerElement}
            <ModalOverlay
                isDismissable

                className={twMerge(
                    "fixed z-[100] top-0 left-0 w-screen h-screen bg-transparent/45 flex items-center justify-center",
                    classNames?.modalClassName
                )}
            >
                <Modal isDismissable>
                    <Dialog className={twMerge("", classNames?.dialogClassName)}>
                        {children}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DialogTrigger>
    );
}