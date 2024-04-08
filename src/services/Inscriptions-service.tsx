import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const getAllRegistration = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/inscription`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllCourseRegistration = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`${BASE_URL}/api/inscription/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInscriptionById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/api/inscription/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInscriptionsWithFilters = async (values: any) => {
  try {
    const queryParams = new URLSearchParams();

    for (const key in values) {
      if (
        values[key] !== undefined &&
        values[key] !== null &&
        (Array.isArray(values[key]) ? values[key].length > 0 : true) &&
        values[key] !== ""
      ) {
        queryParams.append(key, values[key]);
      }
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${BASE_URL}/api/inscription/filters?${queryString}`
      : `${BASE_URL}/api/inscription/filters`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Download Excel

export const generateExcel = async (values: any) => {
  try {
    const queryParams = new URLSearchParams();

    for (const key in values) {
      if (
        values[key] !== undefined &&
        values[key] !== null &&
        (Array.isArray(values[key]) ? values[key].length > 0 : true) &&
        values[key] !== ""
      ) {
        queryParams.append(key, values[key]);
      }
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${BASE_URL}/api/inscription/generate-excel?${queryString}`
      : `${BASE_URL}/api/inscription/generate-excel`;
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "Depoeventos.xlsx";
    document.body.appendChild(link);

    link.click();

    URL.revokeObjectURL(blobUrl);
    document.body.removeChild(link);
  } catch (error) {
    console.log(error);
  }
};
