import React, { useState } from 'react';
import { Beach, createBeach } from '../../axios';
import { tv } from 'tailwind-variants';
import Modal from '../shared/Modal';
import { ModalButtonVariants } from '../../constants/Enum/ModalButtonVariants';
import { SizeVariant } from '../../constants/Enum/SizeVariant';

export interface AddBeachProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBeach: (newBeach: Beach) => void;
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
  base: 'text-grayScale-light text-base',
  slots: {
    internalColumnSpace: 'flex flex-col gap-2 bg-greyScale-clear',
    inputStyle: 'px-3 py-1 w-[600px] bg-greyScale-clear rounded-sm',
    textAreaStyle: 'px-3 py-1 w-[600px] bg-greyScale-clear rounded-sm',
    inputContainer: 'flex flex-col gap-3 justify-center items-center bg-greyScale-white',
  },
});

const { internalColumnSpace, inputStyle, textAreaStyle, inputContainer } = styles();

const AddBeach: React.FC<AddBeachProps> = ({ onAddBeach, isOpen, onClose }) => {
  const [newBeach, setNewBeach] = useState<Omit<Beach, 'id'>>({
    title: '',
    image: '',
    location: { link: '' },
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    if (name === 'link') {
      setNewBeach((prev) => ({ ...prev, location: { ...prev.location, link: value } }));
    } else {
      setNewBeach((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormValid = (): boolean => {
    return (
      newBeach.title.trim() !== '' &&
      newBeach.image.trim() !== '' &&
      newBeach.location.link.trim() !== '' &&
      newBeach.description.trim() !== ''
    );
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    setFeedbackMessage(null);

    try {
      const status = await createBeach({ ...newBeach, id: crypto.randomUUID() });
      if (status === 201) {
        setFeedbackMessage('Praia adicionada com sucesso!');
        setNewBeach({ title: '', image: '', location: { link: '' }, description: '' });
        onClose(); // Fecha o modal após a adição
      } else {
        setFeedbackMessage('Erro ao adicionar a praia. Tente novamente.');
      }
    } catch (error) {
      setFeedbackMessage('Erro inesperado ao adicionar a praia.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={containerStyle({ isOpen })}>
      <Modal
        onClose={onClose}
        closeIcon={true}
        size={SizeVariant.MEDIUM}
        buttonType={ModalButtonVariants.ONE}
        modalTitle="Adicione uma nova praia de Florianópolis a lista"
        buttonLabelOne="Adicionar"
        buttonLabelTwo="Cancelar"
        onClickButtonOne={handleSubmit}
        onClickButtonTwo={onClose}
        disableButtonOne={!isFormValid() || isSubmitting}
      >
        <div className={inputContainer()}>
          <input
            type="text"
            name="title"
            placeholder="Nome da Praia"
            value={newBeach.title}
            onChange={handleInputChange}
            className={inputStyle()}
          />
          <input
            type="text"
            name="image"
            placeholder="Uma imagem, em URL"
            value={newBeach.image}
            onChange={handleInputChange}
            className={inputStyle()}
          />
          <input
            type="text"
            name="link"
            placeholder="Link do Local (Google Maps)"
            value={newBeach.location.link}
            onChange={handleInputChange}
            className={inputStyle()}
          />
          <textarea
            name="description"
            placeholder="Descrição do que te agrada essa praia"
            value={newBeach.description}
            onChange={handleInputChange}
            className={textAreaStyle()}
          />
          {feedbackMessage && <p className="text-center text-sm text-red-500">{feedbackMessage}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default AddBeach;