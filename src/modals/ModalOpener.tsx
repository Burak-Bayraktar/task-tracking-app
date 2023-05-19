import { useModal } from "hooks/useModal";
import ReportModal from "modals/ReportModal";
import "modals/ModalOpener.css";

const possibleModals = [
  {
    name: "Report",
    element: ReportModal,
  },
];

const ModalOpener = () => {
  const { modals } = useModal();

  if (modals?.length === 0) return null;

  return (
    <div className="modal-opener">
      {modals?.map((modal) => {
        const modalToRender = possibleModals.find((m) => m.name === modal.name);
        if (!modalToRender) return null;
        return <modalToRender.element key={modal.name} />;
      })}
    </div>
  );
};

export default ModalOpener;
