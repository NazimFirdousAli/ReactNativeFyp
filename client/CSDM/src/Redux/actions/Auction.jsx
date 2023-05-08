import {
  AUCTION_SHARED_RENTAL,
  FILTERPRICE,
  FILTERTYPE,
  MY_PAGE_GOLF_RES_SELECT_CHAT,
  GOLF_RESER_CHAT_DATA,
  RENTAL_DATA,
  RESERVATION_DATA,
  SALE_DATA,
  LANGUAGE,
  HOME_SEARCH,
  SHEET_POSITION,
} from '../types';

const sharedRentalAuction = data => {
  return {
    type: AUCTION_SHARED_RENTAL,
    payload: data,
  };
};
const SheetPositions = data => {
  return {
    type: SHEET_POSITION,
    payload: data

  }
}
const GolfReserChatData = data => {
  return {
    type: GOLF_RESER_CHAT_DATA,
    payload: data,
  };
};
const ReservationData = data => {
  return {
    type: RESERVATION_DATA,
    payload: data,
  };
};
const SaleData = data => {
  return {
    type: SALE_DATA,
    payload: data,
  };
};
const RentalData = data => {
  return {
    type: RENTAL_DATA,
    payload: data,
  };
};
const MypageGolfResSelectChat = data => {
  return {
    type: MY_PAGE_GOLF_RES_SELECT_CHAT,
    payload: data,
  };
};
const SetLangauge = data => {
  return {
    type: LANGUAGE,
    payload: data,
  };
};

const HomeSearch = data => {
  return {
    type: HOME_SEARCH,
    payload: data,
  };
};

const FilterPrice = NumberObj => {
  return {
    type: FILTERPRICE,
    payload: NumberObj,
  };
};

const FilterType = Type => {
  return {
    type: FILTERTYPE,
    payload: Type,
  }
}

const SearchLength = Type => {
  return {
    type: 'SearchLength',
    payload: { len: Type },
  }
}

export {
  GolfReserChatData,
  sharedRentalAuction,
  ReservationData,
  SaleData,
  RentalData,
  MypageGolfResSelectChat,
  HomeSearch,
  SetLangauge,
  FilterPrice,
  FilterType,
  SearchLength,
  SheetPositions
};
