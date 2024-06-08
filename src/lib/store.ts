import { IWishlistStore } from "@/interfaces/product";
import axios from "axios";
import { create } from "zustand";
type StateType = {
  loading: boolean;
  wishlist: string[];
  changeLoading: () => void;
  loadWishList: () => void;
  addWishList: (id: string) => void;
  removeWishList: (id: string) => void;
};
const useStore = create<StateType>((set) => ({
  loading: false,
  wishlist: [],
  changeLoading: () => set((state) => ({ loading: !state.loading })),
  loadWishList: () => {
    async function fetchdata() {
      const response = await axios.get("/api/buyer/wishlist");
      const wishlist = response.data.products.map(
        (item: IWishlistStore) => item.Product_id
      );
      set((state) => ({ wishlist: wishlist }));
    }
    fetchdata();
  },
  addWishList: (id: string) =>
    set((state) => ({ wishlist: [...state.wishlist, id] })),
  removeWishList: (id: string) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item !== id),
    })),
}));
export default useStore;
