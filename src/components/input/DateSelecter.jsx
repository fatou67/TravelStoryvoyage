import React from 'react';
import { MdOutlineDateRange, MdClose } from 'react-icons/md';
import { DayPicker } from 'react-day-picker';
import moment from 'moment';
import { Month } from 'react-day-picker';

const DateSelecter = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  return (
    <div>
      <button
        className="inline-flex items-center gap-2 text-[13px] font-medium text-sky-600 bg-sky-200/40 hover:bg-sky-200/10 rounded px-2 py-1 cursor-pointer"
        onClick={() => {
          setOpenDatePicker(true);
        }}
      >
        <MdOutlineDateRange className="text-lg" />
        {date
          ? moment(date).format('MMMM D, YYYY')
          : moment().format('MMMM D, YYYY')}
      </button>

      {openDatePicker && (
        <div className="erverFlow-y-scroll p-5 bg-sky-50/50 rounded-lg relative pt-9">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-sky-100 hover:bgsky-100 absolute top-2 right-2"
            onClick={() => {
              setOpenDatePicker(false);
            }}
          >
            <MdClose className="text-xl text-sky-600" />
          </button>

          <DayPicker
            captionLayout="dropdown-buttons"
            mode="single"
            selected={date}
            onSelect={setDate}
            pagenavigation
          />
        </div>
      )}
    </div>
  );
};

export default DateSelecter;
