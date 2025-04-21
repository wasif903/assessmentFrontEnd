import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const useNotes = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["notes", page, limit], // Include page and limit in the query key to ensure proper caching
    queryFn: async () => {
      console.log("Fetching notes...");
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get(`${baseUrl}/api/notes/all-notes`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: { page, limit }
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false
  });
};

export const useCreateNote = onClose => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, desc }) => {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.post(
        `${baseUrl}/api/notes/create-note`,
        { title, desc },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      if (onClose) onClose();
    },
    onError: err => {
      console.error("Failed to create note:", err);
      alert("Error creating note. Try again.");
    }
  });
};

export const useUpdateNote = onClose => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, desc }) => {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.patch(
        `${baseUrl}/api/notes/update-note/${id}`,
        { title, desc },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      if (onClose) onClose();
    },
    onError: err => {
      console.error("Failed to update note:", err);
      alert("Error updating note. Try again.");
    }
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async id => {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.delete(
        `${baseUrl}/api/notes/delete-note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
    onError: err => {
      console.error("Failed to delete note:", err);
      alert("Error deleting note. Try again.");
    }
  });
};
