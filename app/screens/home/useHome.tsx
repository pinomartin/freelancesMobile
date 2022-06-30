import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {ProjectContext} from '../../context/ProjectContext';
import {
  // getProjectsFromUser,
  getProjectsOnRealTime,
} from '../../firebase/firestore/methods/getters/getData';
import {ProjectDTO} from '../../interfaces/Project';
import {PROJECT_DATA} from '../../navigation/routes';

const useHome = () => {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {logout, user} = useContext(AuthContext);
  const {setProjectSelected} = useContext(ProjectContext);
  const {navigate} = useNavigation();

  // const getUserProjects = async () => {
  //   setIsLoading(true);
  //   const response = await getProjectsFromUser(user!.email!);
  //   if (response.kind !== 'ok') {
  //     setProjects([]);
  //     setIsLoading(false);
  //   }
  //   setProjects(response.data);
  //   setIsLoading(false);
  // };

  const onSelectProjectHandler = (project: ProjectDTO) => {
    //@ts-ignore
    setProjectSelected(project);
    navigate(PROJECT_DATA as never);
  };

  useEffect(() => {
    // let isSuscribed = true;
    // getUserProjects();
    // return () => {
    //   isSuscribed = false;
    // };
    const unsubscribe = getProjectsOnRealTime(user!.email!).onSnapshot(snap => {
      const data = snap.docs.map(doc => {
        return {...doc.data(), uid: doc.id} as ProjectDTO;
      });
      setProjects(data);
    });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => unsubscribe();
  }, []);

  return {
    logout,
    user,
    projects,
    isLoading,
    onSelectProjectHandler,
  };
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
