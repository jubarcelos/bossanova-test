import React, { useEffect, useState } from 'react';
import { Beach, updateBeach } from '../../axios';
import Modal from '../shared/Modal';
import { ModalButtonVariants } from '../../constants/Enum/ModalButtonVariants';
import { SizeVariant } from '../../constants/Enum/SizeVariant';

export interface EditBeachProps {
  isOpen: boolean;
  item: Beach;
  onClose: () => void;
  onSave: (updatedBeach: Beach) => void;
}

const ModalEdit: React.FC<EditBeachProps> = ({ isOpen, item, onClose, onSave }) => {
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
    <Modal
      onClose={onClose}
      modalTitle="Editar Praia"
      buttonLabelOne="Salvar"
      buttonLabelTwo="Cancelar"
      onClickButtonOne={handleSave}
      onClickButtonTwo={onClose}
      disableButtonOne={!isFormValid() || isSubmitting}
      buttonType={ModalButtonVariants.TWO}
      size={SizeVariant.MEDIUM}
    >
      <div className="p-4 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Título da Praia"
          value={editedBeach.title}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="image"
          placeholder="URL da Imagem"
          value={editedBeach.image}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="link"
          placeholder="Link do Local (Google Maps)"
          value={editedBeach.location.link}
          onChange={handleInputChange}
          className="input-field"
        />
        <textarea
          name="description"
          placeholder="Descrição da Praia"
          value={editedBeach.description}
          onChange={handleInputChange}
          className="textarea-field"
        />
        {feedbackMessage && <p className="text-center text-sm text-red-500">{feedbackMessage}</p>}
      </div>
    </Modal>
  );
};

export default ModalEdit;