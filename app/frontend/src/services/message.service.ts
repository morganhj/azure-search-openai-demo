export interface ResourceResponse {
  data?: { text: string };
  error?: unknown;
}

export const getPublicResource = async (): Promise<ResourceResponse> => {
  return {
    data: {
      text: "This is a public message.",
    },
  };
};

export const getProtectedResource = async (): Promise<ResourceResponse> => {
  return {
    data: {
      text: "This is a protected message.",
    },
  };
};

export const getAdminResource = async (): Promise<ResourceResponse> => {
  return {
    data: {
      text: "This is an admin message.",
    },
  };
};
