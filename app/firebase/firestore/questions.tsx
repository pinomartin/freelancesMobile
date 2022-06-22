import firestore from '@react-native-firebase/firestore';
import {FAQProps} from '../../interfaces/FAQ';

const addQuestionHelpToDB = async (question: FAQProps): Promise<any> => {
  try {
    await firestore().collection('questions').add({
      name: question.name,
      email: question.email,
      question: question.question,
    });
  } catch (error) {
    console.log('No se puede guardar pregunta en DB');
  }
};

export {addQuestionHelpToDB};
