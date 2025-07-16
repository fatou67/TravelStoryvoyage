import React from 'react';
import moment from 'moment';
import { GrMapLocation } from 'react-icons/gr';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const TravelStoryCard = ({
  imgUrl,
  title,
  story,
  date,
  visitedLocation,
  isFavourite,
  onClick,
  onFavourite
}) => {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer w-full max-w-[420px] mx-auto h-[320px] flex flex-col border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-[160px] w-full overflow-hidden">
        <img
          src={imgUrl || ''}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onClick={onClick}
        />
        <button
          className="absolute top-2 right-2 bg-white/80 rounded-full p-2 shadow-md hover:bg-gray-100 transition"
          onClick={(e) => {
            e.stopPropagation();
            onFavourite?.();
          }}
        >
          {isFavourite ? (
            <FaHeart className="text-red-500 text-base" />
          ) : (
            <FaRegHeart className="text-gray-400 text-base" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow" onClick={onClick}>
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
          {title || 'Titre inconnu'}
        </h3>

        <div className="flex items-center text-sm text-cyan-600 mb-2">
          <GrMapLocation className="mr-1" />
          <span className="truncate">
            {Array.isArray(visitedLocation)
              ? visitedLocation.join(', ')
              : visitedLocation || 'Non spécifié'}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
          {story || 'Aucune description disponible'}
        </p>

        <div className="text-xs text-gray-500 mt-auto">
          {date ? moment(date).format("DD MMM YYYY") : 'Date inconnue'}
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;
