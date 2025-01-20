import React, { useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import Page from '../components/shared/Pages';
import FeedbackCommunication from '../components/shared/FeedbackCommunication';
import CardImage from '../components/UI/CardImage';
import { Beach, getBeaches } from '../axios';
import ModalDetail, { ModalDetailProps } from '../components/UI/ModalDetail';
import AddBeach from '../components/UI/ModalAdd';
import ModalAdd from '../components/UI/ModalAdd';
import ModalEdit from '../components/UI/ModalEdit';

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
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedBeach, setSelectedBeach] = useState<ModalDetailProps['item'] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBeachFormOpen, setIsAddBeachFormOpen] = useState(false);
  const [newBeach, setNewBeach] = useState<Beach | null>(null);

  useEffect(() => {
    const fetchBeaches = async (): Promise<void> => {
      try {
        const data = await getBeaches();
        setBeaches(data);
      } catch (err) {
        setError('Erro ao carregar as praias.');
      }
    };

    fetchBeaches();
  }, []);

  const handleCardClick = (beach: ModalDetailProps['item']): void => {
    setSelectedBeach(beach);
    setIsModalOpen(true);
  };

  const handleCloseModalDetail = (): void => {
    setIsModalOpen(false);
    setSelectedBeach(null);
  };

  const handleCloseModalAdd = (): void => {
    setIsAddBeachFormOpen(false);
  };

  const handleAddBeach = (): void => {
    if (newBeach) {
      setBeaches((prevBeaches) => [...prevBeaches, newBeach]);
      setIsAddBeachFormOpen(false);
      setNewBeach(null);
    } else {
      console.error('Tentativa de adicionar uma praia inválida.');
    }
  };

  return (
    <div className={containerStyle()}>
      <Page className={pageStyle()}>
        <div className={beachesContainer()}>
          {beaches.map((beach) => (
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
            onClose={handleCloseModalAdd}
            onAddBeach={handleAddBeach}
          />
        )}
        {newBeach && <FeedbackCommunication.Success text="Praia incluída!" />}
        {error && <FeedbackCommunication.Error title="Erro" text={error} />}
      </Page>
      {/* {isSuccessAddedBeach === null ? null : isSuccessAddedBeach ? (
        <FeedbackCommunication.Success text="Praia incluída!" />
      ) : (
        <FeedbackCommunication.Error
          title="Erro ao adicionar nova praia"
          text="Tente novamente mais tarde."
        />
      )}
      {isSuccessUpdatedBeach === null ? null : isSuccessUpdatedBeach ? (
        <FeedbackCommunication.Success text="Praia incluída!" />
      ) : (
        <FeedbackCommunication.Error
          title="Erro ao adicionar nova praia"
          text="Tente novamente mais tarde."
        />
      )} */}
    </div>
  );
};

export default Home;
