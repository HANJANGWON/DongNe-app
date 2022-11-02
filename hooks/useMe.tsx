import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      fullName
      avatar
    }
  }
`;

const useMe = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, refetch } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
};

export default useMe;
