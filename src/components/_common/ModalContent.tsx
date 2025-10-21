import type { ModalState } from "@/contexts/ModalContext";
import { CButton } from "./Button";
import "./styles/ModalContent.style.scss";

interface ModalContents extends ModalState {}

const ModalContents = ({ mode, id, title = "", content, onConfirm, onCancel }: ModalContents) => {
    const onClose = () => {
        if (onCancel) {
            onCancel();
        }
    };
    switch (mode) {
        case "alert":
            return (
                <div className="modal-wrapper">
                    <div className="modal" id={id}>
                        <h2>{title}</h2>
                        {content}
                    </div>
                    <CButton mode="primary" onClick={onClose}>
                        확인
                    </CButton>
                </div>
            );
        case "confirm":
            return (
                <div className="modal-wrapper">
                    <div className="modal" id={id}>
                        <h2>{title}</h2>
                        {content}
                        <div className="btn-container">
                            <CButton mode="primary" onClick={onConfirm}>
                                확인
                            </CButton>
                            <CButton mode="outline" onClick={onClose}>
                                취소
                            </CButton>
                        </div>
                    </div>
                </div>
            );
        case "no-btn":
            return (
                <div className="modal-wrapper">
                    <div className="modal" id={id}>
                        {title && <h2>{title}</h2>}
                        {content}
                    </div>
                </div>
            );
        default:
            throw new Error("ModeError: ModalContent mode is out of boundary.");
    }
};

export default ModalContents;
