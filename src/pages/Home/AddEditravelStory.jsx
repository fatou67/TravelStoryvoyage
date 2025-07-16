import React from 'react';
import {
  MdAdd,
  MdUpdate,
  MdClose,
  MdDeleteOutline
} from 'react-icons/md';
import DateSelecter from '../../components/input/DateSelecter';
import ImageSelecter from '../../components/input/imageSelecter .jsx';
import TagInput from '../../components/input/TagInput';

const AddEditravelStory = ({
  storyInfo,
  type,
  onClose,
  getAlltravelStories,
}) => {

  const [title, setTitle] = React.useState("");
  const [storyImg, setStoryImg] = React.useState(null);
  const [story, setStory] = React.useState("");
  const [visitedLocation, setVisitedLocation] = React.useState("");
  const [visitedDate, setVisitedDate] = React.useState(null);

const [error, setError] = React.useState("");

//AA new Travel Story 




// update Travel Story
const updateTravelStory = async () => {

}

  const handleAddOrUpdateClick = () => {
    console.log("input Data" (title, storyImg, story, visitedLocation, visitedDate));
    if ( title) {
      setError("Please enter the title")
      return;
    }
    if (!story) {
      setError("Please enter the story")
      return;
    }

    setError("");
    if (type === "edit") {
      updateTravelStory();
      } else {
        addTravelStory();
        }
   
  };

  const handleDeleteStoryImg = async () => {
    console.log("Suppression image");
    // À implémenter : suppression d'image
  };

  return (
    <div>
      {/* En-tête */}
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h5 className="text-xl font-semibold text-slate-700">
          {type === 'add' ? 'Add Story' : 'Update Story'}
        </h5>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 text-sm font-medium bg-cyan-500 text-white px-3 py-1.5 rounded hover:bg-cyan-600 transition"
            onClick={handleAddOrUpdateClick}
          >
            {type === 'add' ? (
              <>
                <MdAdd className="text-base" /> Add Story
              </>
            ) : (
              <>
                <MdUpdate className="text-base" /> Update Story
              </>
            )}
          </button>

          {type === 'edit' && (
            <button
              className="flex items-center gap-1 text-sm font-medium bg-red-100 text-red-600 px-3 py-1.5 rounded hover:bg-red-200 transition"
              onClick={onClose}
            >
              <MdDeleteOutline className="text-base" /> Close
            </button>
          )}

          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            onClick={onClose}
          >
            <MdClose className="text-lg text-slate-500 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Formulaire */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-slate-600 font-medium block mb-1">Title</label>
          <input
            type="text"
            className="w-full border-b-2 border-cyan-500 focus:outline-none text-lg text-slate-800 placeholder:text-slate-400"
            placeholder="A Day at the Great Wall"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-slate-600 font-medium block mb-1">Visited Date</label>
          <DateSelecter date={visitedDate} setDate={setVisitedDate} />
        </div>

        <ImageSelecter
          image={storyImg}
          setImage={setStoryImg}
          handleDeleteImg={handleDeleteStoryImg}
        />

        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-medium text-slate-600">Story</label>
          <textarea
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            placeholder="Your Story"
            rows={10}
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>
        <div className="pt-3">
          <label className="input-label">VISITED LOCATIONS</label>
          <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
        </div>
      </div>
    </div>
  );
};

export default AddEditravelStory;
