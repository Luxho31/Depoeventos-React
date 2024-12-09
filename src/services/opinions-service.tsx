import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export const createTestimonial = async (body: any) => {
  try {
    await fetch(`${BASE_URL}/api/opinions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Error al enviar testimonio:", error);
    throw error;
  }
};

export const getAllTestimonials = () => {
  return fetch(`${BASE_URL}/api/opinions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getTestimonialById = (id: number) => {
  return fetch(`${BASE_URL}/api/opinions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateTestimonialApproval = (id: number) => {
  return fetch(`${BASE_URL}/api/opinions/approve/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateTestimonialDisapproval = (id: number) => {
  return fetch(`${BASE_URL}/api/opinions/disapprove/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const getAllTestimonialsApproved = async () => {
  return await fetch(`${BASE_URL}/api/opinions/approved`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
