import { useCustomToast } from "components/app/hooks/useCustomToast";
import jsonpatch from "fast-json-patch";
import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
import { queryKeys } from "react-query/constants";

import type { User } from "../../../../../shared/types";
import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
import { useUser } from "./useUser";

// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
    }
  );
  return data.user;
}

// TODO: update type to UseMutateFunction type
export function usePatchUser(): UseMutateFunction<
  User,
  unknown,
  User,
  unknown
> {
  const { user, updateUser } = useUser();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate: patchUser } = useMutation(
    (newUserData: User) => patchUserOnServer(newUserData, user),
    {
      onSuccess: (userData: User | null) => {
        if (userData) {
          updateUser(userData);
          toast({
            title: "User updated!",
            status: "success",
          });
        }
      },
      onMutate: async (newData: User | null) => {
        queryClient.cancelQueries(queryKeys.user);

        const prevUserData: User = queryClient.getQueryData(queryKeys.user);

        updateUser(newData);

        return { prevUserData };
      },
      onError: (_, __, context) => {
        updateUser(context.prevUserData);
        toast({
          title: "Update failed; restoring...",
          status: "warning",
        });
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKeys.user);
      },
    }
  );

  return patchUser;
}
