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

// type InscriptionFilters = {
//   productIds: number[];
//   campusesIds: number[];
//   categoriesIds: number[];
//   [key: string]: number[];
// };

export const getInscriptionsWithFilters = async (values: any) => {
  try {
    const queryParams = new URLSearchParams();

    for (const key in values) {
      if (
        values[key] !== undefined &&
        values[key] !== null &&
        (Array.isArray(values[key]) ? values[key].length > 0 : true)
      ) {
        const value = Array.isArray(values[key])
          ? values[key].join(",")
          : values[key];
        queryParams.append(key, value.toString());
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
    return undefined;
  }
};

// Download Excel

type GenerateExcelValues = {
  productIds: number[];
  campusesIds: number[];
  categoriesIds: number[];
  [key: string]: number[] | string | undefined;
};

type GenerateExcelResponse = Blob;

export const generateExcel = async (
  values: GenerateExcelValues
): Promise<GenerateExcelResponse | undefined> => {
  try {
    const queryParams = new URLSearchParams();

    for (const key in values) {
      const value = values[key];
      if (value !== undefined && value !== null) {
        if (Array.isArray(value) && value.length > 0) {
          queryParams.append(key, value.join(","));
        } else if (typeof value === "string" && value.trim() !== "") {
          queryParams.append(key, value);
        }
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

    return blob;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const changeChildrenCourse = async (body: any) => {
  try {
    console.log(body);
    const sendBody = {
      childrens1: body.children1,
      childrens2: body.children2,
    };
    console.log(sendBody);
    const response = await fetch(
      `${BASE_URL}/api/inscription/change-inscription?product1=${body.product1}&product2=${body.product2}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendBody),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
