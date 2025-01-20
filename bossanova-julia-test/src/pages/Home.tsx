import React, { useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import Page from '../components/shared/Pages';
import CardImage from '../components/UI/CardImage';
import ModalDetail, { ModalDetailProps } from '../components/UI/ModalDetail';
import ModalAdd from '../components/UI/ModalAdd';
import { useAtom } from 'jotai';
import { beachesAtom, addBeachAtom } from '../atoms';
import { Beach, getBeaches } from '../axios';

const styles = tv({
  slots: {
    containerStyle: 'relative',
    pageStyle: 'bg-greyScale-clear',
    beachesContainer: 'my-10 flex gap-8 flex-wrap justify-center items-center',
    buttonStyle:
      'flex justify-center items-center py-3 px-4 rounded-sm text-branding-tertiary bg-greyScale-white hover:bg-tertiaryScale-clear active:bg-tertiaryScale-light',
  },
});

const { pageStyle, containerStyle, beachesContainer, buttonStyle } = styles();

const Home: React.FC = () => {
  const [beaches, setBeaches] = useAtom(beachesAtom);
  const [, addBeach] = useAtom(addBeachAtom);
  const [selectedBeach, setSelectedBeach] = useState<ModalDetailProps['item'] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBeachFormOpen, setIsAddBeachFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        const data = await getBeaches();
        setBeaches(data);
      } catch {
        setError('Erro ao carregar as praias.');
      }
    };
    fetchBeaches();
  }, [setBeaches]);

  const handleCardClick = (beach: ModalDetailProps['item']): void => {
    setSelectedBeach(beach);
    setIsModalOpen(true);
  };

  const handleCloseModalDetail = (): void => {
    setIsModalOpen(false);
    setSelectedBeach(null);
  };

  const handleAddBeach = (newBeach: Beach): void => {
    addBeach(newBeach);
    setIsAddBeachFormOpen(false);
  };

  return (
    <div className={containerStyle()}>
      <Page className={pageStyle()}>
        <div className={beachesContainer()}>
          {beaches.map((beach: Beach) => (
            <CardImage
              key={beach.id}
              img={beach.image}
              title={beach.title}
              onClick={() => handleCardClick(beach)}
            />
          ))}
        </div>
        <ModalDetail isOpen={isModalOpen} item={selectedBeach!} onClose={handleCloseModalDetail} />
        <div className="flex justify-end pb-16 pr-10">
          <button className={buttonStyle()} onClick={() => setIsAddBeachFormOpen(true)}>
            Adicionar nova praia
          </button>
        </div>
        {isAddBeachFormOpen && (
          <ModalAdd
            isOpen={isAddBeachFormOpen}
            onClose={() => setIsAddBeachFormOpen(false)}
            onAddBeach={handleAddBeach}
          />
        )}
        {error && <div className="text-red-500 text-center">{error}</div>}
      </Page>
    </div>
  );
};

export default Home;
