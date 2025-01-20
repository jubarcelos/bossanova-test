import React, { useState } from 'react';
import { tv } from 'tailwind-variants';
import Modal from '../shared/Modal';
import { ModalButtonVariants } from '../../constants/Enum/ModalButtonVariants';
import { SizeVariant } from '../../constants/Enum/SizeVariant';
import { Beach, fetchBeachesWithFilters } from '../../axios';
import ModalDetail from './ModalDetail';

export interface SearchBeachProps {
  isOpen: boolean;
  onClose: () => void;
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

export const styles = tv({
  base: 'text-grayScale-light text-base',
  slots: {
    inputStyle: 'px-3 py-1 w-[600px] bg-greyScale-clear rounded-sm',
    inputContainer: 'flex flex-col gap-3 justify-center items-center bg-greyScale-white',
    body: 'flex p-8 justify-center items-center text-grayScale-light border-greyScale-white text-base bg-greyScale-white',
    linkStyle: 'text-tertiaryScale-medium underline hover:text-secondaryScale-dark',
  },
});

const { inputStyle, inputContainer, body, linkStyle } = styles();

const SearchBeach: React.FC<SearchBeachProps> = ({ isOpen, onClose }) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLink, setSearchLink] = useState('');
  const [filteredBeaches, setFilteredBeaches] = useState<Beach[] | undefined>([]);
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);

  const handleSearch = async (): Promise<void> => {
    const filters: { [key: string]: string } = {};

    if (searchTitle) {
      filters.title_like = searchTitle.toLowerCase();
    }

    if (searchLink) {
      filters['location.link_like'] = searchLink;
    }

    try {
      const beaches = await fetchBeachesWithFilters(filters);
      setFilteredBeaches(beaches);
    } catch (error) {
      console.error('Erro ao realizar a busca', error);
    }
  };

  const handleSelectBeach = (beach: Beach): void => {
    setSelectedBeach(beach);
  };

  return (
    <div className={containerStyle({ isOpen })}>
      <Modal
        onClose={onClose}
        closeIcon={true}
        size={SizeVariant.MEDIUM}
        buttonType={ModalButtonVariants.ONE}
        modalTitle="Procure por uma praia de Florianópolis"
        buttonLabelOne="Procurar"
        buttonLabelTwo="Cancelar"
        onClickButtonOne={handleSearch}
        onClickButtonTwo={onClose}
      >
        <div className={inputContainer()}>
          <input
            type="text"
            name="title"
            placeholder="Qual nome da praia que você busca?"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className={inputStyle()}
          />
          <input
            type="text"
            name="link"
            placeholder="Você tem a localização no google?"
            value={searchLink}
            onChange={(e) => setSearchLink(e.target.value)}
            className={inputStyle()}
          />
        </div>

        <div className={body()}>
          {filteredBeaches !== undefined && filteredBeaches.length > 0 ? (
            <ul>
              {filteredBeaches.map((beach) => (
                <li key={beach.id}>
                  <button onClick={() => handleSelectBeach(beach)} className={linkStyle()}>
                    {beach.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={body()}>Nenhuma praia encontrada.</p>
          )}
        </div>
      </Modal>

      {/* Modal de detalhes */}
      {selectedBeach && (
        <ModalDetail
          isOpen={!!selectedBeach}
          onClose={() => setSelectedBeach(null)}
          item={selectedBeach}
        />
      )}
    </div>
  );
};

export default SearchBeach;
