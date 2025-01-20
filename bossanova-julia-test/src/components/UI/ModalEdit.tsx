import React, { useEffect, useState } from 'react';
import { Beach, updateBeach } from '../../axios';
import Modal from '../shared/Modal';
import { ModalButtonVariants } from '../../constants/Enum/ModalButtonVariants';
import { SizeVariant } from '../../constants/Enum/SizeVariant';
import { tv } from 'tailwind-variants';
import { styles } from './ModalAdd';
import { stylesDetails } from './ModalDetail';
import { useAtom } from 'jotai';
import { beachesAtom } from '../../atoms';

export interface EditBeachProps {
  isOpen: boolean;
  item: Beach;
  onClose: () => void;
  onSave: (updatedBeach: Beach) => void;
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

const ModalEdit: React.FC<EditBeachProps> = ({ isOpen, item, onClose, onSave }) => {
  const [beaches, setBeaches] = useAtom(beachesAtom);
  const [editedBeach, setEditedBeach] = useState<Beach | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Update editedBeach when item changes
  useEffect(() => {
    if (item) {
      setEditedBeach({
        id: item.id || '',
        title: item.title || '',
        image: item.image || '',
        location: { link: item.location?.link || '' },
        description: item.description || '',
      });
    }
  }, [item]);

  if (!isOpen || !editedBeach) {
    return null;
  }
  const { inputStyle, textAreaStyle, inputContainer } = styles();
  const { internalColumnSpace, body } = stylesDetails();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    if (name === 'link') {
      setEditedBeach((prev) =>
        prev ? { ...prev, location: { ...prev.location, link: value } } : null,
      );
    } else {
      setEditedBeach((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleSave = async (): Promise<void> => {
    if (!editedBeach) {
      return;
    }
    setIsSubmitting(true);
    setFeedbackMessage(null);

    try {
      const status = await updateBeach(editedBeach);
      if (status === 200) {
        setFeedbackMessage('Praia atualizada com sucesso!');
        // Atualizar o estado global com a praia editada
        setBeaches((prevBeaches: Beach[]) =>
          prevBeaches.map((beach) => (beach.id === editedBeach.id ? editedBeach : beach)),
        );
        onSave(editedBeach);
        onClose();
      } else {
        setFeedbackMessage('Erro ao atualizar a praia. Tente novamente.');
      }
    } catch (error) {
      setFeedbackMessage('Erro inesperado ao atualizar a praia.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = (): boolean => {
    return (
      editedBeach.title.trim() !== '' &&
      editedBeach.image.trim() !== '' &&
      editedBeach.location.link.trim() !== '' &&
      editedBeach.description.trim() !== ''
    );
  };

  return (
    <div className={containerStyle({ isOpen })}>
      <Modal
        onClose={onClose}
        modalTitle="Editar Praia"
        modalSubtitle="Aqui estão apresentadas as informações atuais, edite como preferir"
        buttonLabelOne="Salvar"
        buttonLabelTwo="Cancelar"
        onClickButtonOne={handleSave}
        onClickButtonTwo={onClose}
        disableButtonOne={!isFormValid() || isSubmitting}
        buttonType={ModalButtonVariants.TWO}
        size={SizeVariant.MEDIUM}
      >
        <div className="flex flex-col gap-4 bg-greyScale-white">
          <div className={internalColumnSpace()}>
            <img src={item.image} alt={item.title} />
            <p className={body()}>{item.description}</p>
          </div>
          <div className={inputContainer()}>
            <input
              type="text"
              name="title"
              placeholder="Nome da Praia"
              value={editedBeach.title}
              onChange={handleInputChange}
              className={inputStyle()}
            />
            <input
              type="text"
              name="image"
              placeholder="Uma imagem, em URL"
              value={editedBeach.image}
              onChange={handleInputChange}
              className={inputStyle()}
            />
            <input
              type="text"
              name="link"
              placeholder="Link do Local (Google Maps)"
              value={editedBeach.location.link}
              onChange={handleInputChange}
              className={inputStyle()}
            />
            <textarea
              name="description"
              placeholder="Descrição do que te agrada essa praia"
              value={editedBeach.description}
              onChange={handleInputChange}
              className={textAreaStyle()}
            />
            {feedbackMessage && (
              <p className="text-center text-sm text-red-500">{feedbackMessage}</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalEdit;
