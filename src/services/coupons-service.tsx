import { generalRoutes } from "../utils/routes/general.routes";

const BASE_URL = generalRoutes.BASE_URL;

export type Coupon = {
  id: number;
  name: string;
  description?: string;
  code: string;
  value: number;
  expirationDate: string;
  active: boolean;
};

type CreateCouponDto = Omit<Coupon, "id">;
type UpdateCouponDto = Partial<Omit<Coupon, "id">>;

const jsonHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
});

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detail = "";
    try {
      const text = await res.text();
      detail = text || "";
      try {
        const json = JSON.parse(text);
        detail = typeof json === "string" ? json : JSON.stringify(json);
      } catch {
        //
      }
    } catch {
      //
    }
    throw new Error(
      `HTTP ${res.status} ${res.statusText}` + (detail ? ` - ${detail}` : "")
    );
  }

  if (res.status === 204 || res.status === 205) {
    // @ts-expect-error: intencional cuando T es void
    return undefined;
  }

  const text = await res.text();
  if (!text) {
    // @ts-expect-error: intencional cuando T es void
    return undefined;
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

export const createCoupon = async (form: CreateCouponDto): Promise<Coupon> => {
  const res = await fetch(`${BASE_URL}/api/coupons`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(form),
  });
  return handleResponse<Coupon>(res);
};

export const getAllCoupons = async (): Promise<Coupon[]> => {
  const res = await fetch(`${BASE_URL}/api/coupons`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return handleResponse<Coupon[]>(res);
};

export const getCouponById = async (id: number): Promise<Coupon> => {
  const res = await fetch(`${BASE_URL}/api/coupons/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return handleResponse<Coupon>(res);
};

export const updateCoupon = async (
  id: number,
  form: UpdateCouponDto
): Promise<Coupon> => {
  if (!id) throw new Error("El id del cupón es requerido");
  const res = await fetch(`${BASE_URL}/api/coupons/${id}`, {
    method: "PUT",
    headers: jsonHeaders(),
    body: JSON.stringify(form),
  });
  return handleResponse<Coupon>(res);
};

export const deleteCoupon = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/api/coupons/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  await handleResponse<void>(res); // 204
};

export const getCouponByCode = async (code: string): Promise<Coupon> => {
  const res = await fetch(
    `${BASE_URL}/api/coupons/by-code/${encodeURIComponent(code)}`,
    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
  );
  return handleResponse<Coupon>(res);
};

export const existsCouponByCode = async (code: string): Promise<boolean> => {
  const res = await fetch(
    `${BASE_URL}/api/coupons/exists?code=${encodeURIComponent(code)}`,
    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
  );
  return handleResponse<boolean>(res);
};

export const toggleCouponActive = async (
  id: number,
  value: boolean
): Promise<Coupon> => {
  const res = await fetch(
    `${BASE_URL}/api/coupons/${id}/active?value=${value}`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return handleResponse<Coupon>(res);
};
