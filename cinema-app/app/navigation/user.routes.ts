import Home from "@/components/screens/home/Home";
import Auth from "@/components/screens/auth/Auth";
import { IRoute } from "./navigation.types";


export const userRoutes:IRoute[] = [
  {
    name: "Home",
    component: Home
  },
  {
    name: "Auth",
    component: Auth
  }
]