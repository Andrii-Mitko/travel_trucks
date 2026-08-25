import axios from "axios";
import type {
  CamperListResponse,
  CamperDetails,
  Review,
  CampersFilters,
  BookingRequestPayload,
  BookingRequestResponse,
  CamperQueryParams,
} from "@/types/camper";

export const api = axios.create({
  baseURL: "https://campers-api.goit.study",
});

export const getCampers = async (
  params: CamperQueryParams,
): Promise<CamperListResponse> => {
  const { data } = await api.get<CamperListResponse>("/campers", { params });
  return data;
};

export const getCampersFilters = async (): Promise<CampersFilters> => {
  const { data } = await api.get<CampersFilters>("/campers/filters");
  return data;
};

export const getCamperById = async (
  camperId: string,
): Promise<CamperDetails> => {
  const { data } = await api.get<CamperDetails>(`/campers/${camperId}`);
  return data;
};

export const getCamperReviews = async (camperId: string): Promise<Review[]> => {
  const { data } = await api.get<Review[]>(`/campers/${camperId}/reviews`);
  return data;
};

export const createBookingRequest = async (
  camperId: string,
  payload: BookingRequestPayload,
): Promise<BookingRequestResponse> => {
  const { data } = await api.post<BookingRequestResponse>(
    `/campers/${camperId}/booking-requests`,
    payload,
  );
  return data;
};
