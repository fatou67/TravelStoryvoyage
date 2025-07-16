import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../utils/axiosInstance';
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import TravelStoryCard from '../../components/Cards/TravelStoryCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditravelStory from '../../pages/Home/AddEditravelStory';

Modal.setAppElement('#root'); // important pour le bon fonctionnement du modal

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [allStories, setAllStories] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");

      if (response.data?.stories) {
        const formattedStories = response.data.stories.map(story => {
          let imagePath = story.imageUrl || story.imgUrl || "";

          if (!imagePath.startsWith('http')) {
            imagePath = imagePath.replace(/^\/+/, '');
            imagePath = `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'}/${imagePath}`;
          }

          return {
            ...story,
            imgUrl: imagePath,
            id: story._id || story.id,
            visitedDate: story.visitedDate || null,
            visitedLocation: Array.isArray(story.visitedLocation)
              ? story.visitedLocation
              : story.visitedLocation ? [story.visitedLocation] : []
          };
        });

        const uniqueStories = formattedStories.filter(
          (story, index, self) => index === self.findIndex((t) => t.id === story.id)
        );

        setAllStories(uniqueStories);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des stories :", error.response?.data || error.message);
      toast.error("Erreur lors du chargement des histoires");
    }
  };

  const handleEdit = (data) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data
    });
  };

  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id;

    try {
      const response = await axiosInstance.put(
        `/update-is-Favourite/${storyId}`,
        {
          isFavourite: !storyData.isFavourite,
        }
      );
      if (response.data?.story) {
        toast.success("Story mise à jour avec succès !");
        getAllTravelStories();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleViewStory = (storyId) => {
    navigate(`/story/${storyId}`);
  };

  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row gap-7">
          {/* Liste des histoires */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allStories.slice(0, 2).map(story => (
                <div key={story.id} className="h-full">
                  <TravelStoryCard
                    imgUrl={story.imgUrl}
                    title={story.title || "Titre inconnu"}
                    story={story.story || "Pas de description"}
                    date={
                      story.visitedDate &&
                      !isNaN(new Date(story.visitedDate).getTime())
                        ? new Date(story.visitedDate).toLocaleDateString()
                        : null
                    }
                    visitedLocation={story.visitedLocation}
                    isFavourite={story.isFavourite}
                    onEdit={() => handleEdit(story)}
                    onClick={() => handleViewStory(story.id)}
                    onFavourite={() => updateIsFavourite(story)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Colonne de droite vide */}
          <div className="w-full md:w-[400px]"></div>
        </div>
      </div>

      {/* ✅ Modal centré et réduit */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        className="bg-white rounded-xl p-5 w-[350px] max-h-[90vh] shadow-xl overflow-y-auto z-50"
      >
        <AddEditravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAlltravelStories={getAllTravelStories}
        />
      </Modal>

      {/* Bouton pour ajouter une nouvelle histoire */}
      <button
        className="w-12 h-12 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-6 bottom-6 transition-colors duration-200 shadow-lg"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
        aria-label="Ajouter une nouvelle story"
      >
        <MdAdd className="text-2xl text-white" />
      </button>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default Home;
