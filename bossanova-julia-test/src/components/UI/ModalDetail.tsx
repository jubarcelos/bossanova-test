import { tv } from 'tailwind-variants';
import { useState } from 'react';
import { SizeVariant } from '../../constants/Enum/SizeVariant';
import { ModalButtonVariants } from '../../constants/Enum/ModalButtonVariants';
import Modal from '../shared/Modal';
import { Beach } from '../../axios';
import ModalEdit from './ModalEdit';

export interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  item: Beach;
}

const containerStyle = tv({
  base: 'fixed z-30 bg-greyScale-white bg-opacity-60 w-full h-full top-0 left-0 py-10 justify-center overflow-y-auto',
  variants: {
    isOpen: {
      true: 'flex',
      false: 'hidden',
    },
  },
});
const styles = tv({
  slots: {
    internalColumnSpace: 'flex flex-col gap-2 bg-greyScale-clear',
    body: 'flex justify-center items-center text-grayScale-light bg-greyScale-clear border-greyScale-white text-base mx-6 my-6',
  },
});

const { internalColumnSpace, body } = styles();

const ModalDetail: React.FC<ModalDetailProps> = ({ isOpen, item, onClose }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!isOpen || !item) {
    return null;
  }

  const handleEditClick = (): void => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = (): void => {
    setIsEditModalOpen(false);
    onClose();
  };

  const handleSave = (updatedItem: Beach): void => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className={containerStyle({ isOpen })}>
        <Modal
          onClose={onClose}
          closeIcon={true}
          size={SizeVariant.MEDIUM}
          buttonType={ModalButtonVariants.TWO}
          modalTitle={`${item.title} - Florianópolis SC, Brasil`}
          modalSubtitle=""
          buttonLabelOne="Editar"
          buttonLabelTwo="Ver no mapa"
          onClickButtonOne={handleEditClick}
          onClickButtonTwo={() => window.open(item.location.link, '_blank')}
        >
          <div className={internalColumnSpace()}>
            <img src={item.image} alt={item.title} />
            <p className={body()}>{item.description}</p>
          </div>
        </Modal>
      </div>
      {isEditModalOpen && (
        <ModalEdit
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          item={item}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ModalDetail;
