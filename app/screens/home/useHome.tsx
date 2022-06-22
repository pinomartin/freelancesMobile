import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {getProjectsFromUser} from '../../firebase/firestore/getData';
import {ProjectDTO} from '../../interfaces/Project';

const useHome = () => {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {logout, user} = useContext(AuthContext);

  const getUserProjects = async () => {
    setIsLoading(true);
    const response = await getProjectsFromUser(user!.email!);
    if (response.kind !== 'ok') {
      setProjects([]);
      setIsLoading(false);
    }
    setProjects(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    let isSuscribed = true;
    getUserProjects();
    return () => {
      isSuscribed = false;
    };
  }, []);

  return {logout, user, projects, isLoading};
};

export default useHome;

// useEffect(() => {
//     let isSubscribed = true
//     if (accounts && isEmpty(accountsTransactions)) {
//       const callAccountTransaction = async () => {
//         const accountsId = accounts?.map((a) => a.accountId)
//         const t = await getTransactions("21", accountsId)
//         if (isSubscribed) {
//           setAccountsTransactions(t)
//         }
//       }
//       callAccountTransaction().catch((e) => console.log(e))
//     }
//     return () => {
//       isSubscribed = false
//     }
//   }, [accountsTransactions])
