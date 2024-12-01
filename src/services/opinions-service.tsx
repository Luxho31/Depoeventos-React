import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const createTestimonial = async (body: any) => {
  try {
    const response = await fetch(`${BASE_URL}/api/testimonials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status === 201) {
      return response.json();
    } else {
      throw new Error("Error al enviar testimonio");
    }
  } catch (error) {
    console.error("Error al enviar testimonio:", error);
    throw error;
  }
};

export const getTestimonials = () => {
  return fetch(`${BASE_URL}/api/testimonials`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getTestimonialById = (id: number) => {
  return fetch(`${BASE_URL}/api/testimonials/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateTestimonialApproval = (id: number) => {
  return fetch(`${BASE_URL}/api/testimonials/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
