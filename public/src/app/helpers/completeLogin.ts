import { NavigationExtras } from "@angular/router";
import { PATH_MENU } from "../paths.const";

export const completeLogin = (userName: string, navigate: (commands: any[], extras?: NavigationExtras)=> Promise<boolean>): void => {
  localStorage.userName = userName;
  navigate([PATH_MENU]);
}