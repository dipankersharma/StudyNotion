
import toast from 'react-hot-toast';
import { apiconnector } from '../apiConnector';
import { pageAndComponentDeatils } from '../apis';

const CategoryPageDetails =  async(categoryId) => {
  
   const toastId =toast.loading("Loading...") 
    let result = [];

    try {

        const response = await apiconnector("POST", pageAndComponentDeatils.GET_CATEEGORY_DETAILS,{categoryId:categoryId,});
        if(!response?.data?.success){
            toast.error("Error in fetching categories")
            return;
        }
       result = response?.data;
    } catch (error) {
       console.log("Error in fetching categories", error)
    //    toast.error("Error in fetching categories")
        
    }
    toast.dismiss(toastId)
    return result;
}

export default CategoryPageDetails;
